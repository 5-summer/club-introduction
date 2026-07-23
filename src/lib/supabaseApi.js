import { requireSupabase } from './supabase.js'

const IMAGE_BUCKET = 'club-images'

function createStoragePath(folder, file) {
  const safeName = file.name
    .normalize('NFKD')
    .replace(/[^\w.-]/g, '_')
    .toLowerCase()

  return `${folder}/${crypto.randomUUID()}-${safeName}`
}

async function uploadImage(file, folder) {
  const client = requireSupabase()
  const path = createStoragePath(folder, file)
  const { error } = await client.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    throw error
  }

  const { data } = client.storage.from(IMAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

function getStoragePath(publicUrl) {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`
  const markerIndex = publicUrl?.indexOf(marker) ?? -1

  if (markerIndex === -1) {
    return null
  }

  return decodeURIComponent(publicUrl.slice(markerIndex + marker.length))
}

async function deleteImages(imageUrls) {
  const paths = imageUrls.map(getStoragePath).filter(Boolean)

  if (paths.length === 0) {
    return
  }

  const client = requireSupabase()
  const { error } = await client.storage.from(IMAGE_BUCKET).remove(paths)

  if (error) {
    throw error
  }
}

async function tryDeleteImages(imageUrls) {
  try {
    await deleteImages(imageUrls)
  } catch (error) {
    console.warn('Storage 이미지를 정리하지 못했습니다.', error)
  }
}

async function findClubIdByName(clubName) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('clubs')
    .select('id')
    .eq('name', clubName)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data?.id ?? null
}

export async function getClubs() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('clubs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getClub(clubId) {
  if (!clubId || !/^\d+$/.test(String(clubId))) {
    return null
  }

  const client = requireSupabase()
  const { data, error } = await client
    .from('clubs')
    .select('*')
    .eq('id', clubId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function createClub({ club, photo }) {
  const client = requireSupabase()
  const imageUrl = photo ? await uploadImage(photo, 'clubs') : null
  const { data, error } = await client
    .from('clubs')
    .insert({
      ...club,
      image_url: imageUrl,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateClub({ clubId, club, photo, previousImageUrl }) {
  const client = requireSupabase()
  const imageUrl = photo
    ? await uploadImage(photo, 'clubs')
    : previousImageUrl || null
  const { data, error } = await client
    .from('clubs')
    .update({
      ...club,
      image_url: imageUrl,
    })
    .eq('id', clubId)
    .select()
    .single()

  if (error) {
    throw error
  }

  const { error: activitySyncError } = await client
    .from('activities')
    .update({ club_name: club.name })
    .eq('club_id', clubId)

  if (activitySyncError) {
    throw activitySyncError
  }

  if (photo && previousImageUrl && previousImageUrl !== imageUrl) {
    await tryDeleteImages([previousImageUrl])
  }

  return data
}

export async function deleteClub(club) {
  const client = requireSupabase()
  const { error } = await client.from('clubs').delete().eq('id', club.id)

  if (error) {
    throw error
  }

  if (club.image_url) {
    await tryDeleteImages([club.image_url])
  }
}

export async function getActivities() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('activities')
    .select(`
      *,
      clubs:club_id (
        id,
        name,
        category,
        detail,
        grade
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getActivity(activityId) {
  if (!activityId || !/^\d+$/.test(String(activityId))) {
    return null
  }

  const client = requireSupabase()
  const { data, error } = await client
    .from('activities')
    .select(`
      *,
      clubs:club_id (
        name
      )
    `)
    .eq('id', activityId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function createActivity({ clubName, content, photos }) {
  const client = requireSupabase()
  const normalizedClubName = clubName.trim()
  const clubId = await findClubIdByName(normalizedClubName)

  const imageUrls = await Promise.all(
    photos.map((photo) => uploadImage(photo, 'activities')),
  )
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  const { data, error } = await client
    .from('activities')
    .insert({
      club_id: clubId,
      club_name: normalizedClubName,
      title: `${formattedDate} 활동 사진 및 내용`,
      content,
      image_urls: imageUrls,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateActivity({
  activityId,
  clubName,
  content,
  existingImageUrls,
  newPhotos,
  removedImageUrls,
}) {
  const client = requireSupabase()
  const normalizedClubName = clubName.trim()
  const clubId = await findClubIdByName(normalizedClubName)
  const newImageUrls = await Promise.all(
    newPhotos.map((photo) => uploadImage(photo, 'activities')),
  )
  const imageUrls = [...existingImageUrls, ...newImageUrls]
  const { data, error } = await client
    .from('activities')
    .update({
      club_id: clubId,
      club_name: normalizedClubName,
      content,
      image_urls: imageUrls,
    })
    .eq('id', activityId)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (removedImageUrls.length > 0) {
    await tryDeleteImages(removedImageUrls)
  }

  return data
}

export async function deleteActivity(activity) {
  const client = requireSupabase()
  const { error } = await client
    .from('activities')
    .delete()
    .eq('id', activity.id)

  if (error) {
    throw error
  }

  if ((activity.image_urls ?? []).length > 0) {
    await tryDeleteImages(activity.image_urls)
  }
}
