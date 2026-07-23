# 관리자 계정 설정

## 코드 업데이트 후 스키마 반영

Supabase Dashboard의 `SQL Editor`에서 `supabase/schema.sql` 전체 내용을 다시
실행하세요. 이 스크립트는 기존 데이터를 삭제하지 않고 활동 글과 동아리를 연결하는
`activities.club_id`, `activities.club_name`, 동아리 모집 인원 필드와 관리자
수정·삭제 정책을 추가합니다.

이 SQL을 실행하지 않으면 갤러리, 모집 인원, 수정·삭제 기능이 정상 동작하지 않습니다.

프론트에서는 `admin`이라는 ID를 `VITE_ADMIN_EMAIL`에 설정한 Supabase 이메일로
변환해 로그인합니다. 비밀번호는 소스 코드나 환경변수에 저장하지 않고 Supabase
Auth가 검증합니다.

1. Supabase Dashboard에서 `Authentication → Users → Add user`로 이동합니다.
2. `.env.local`의 `VITE_ADMIN_EMAIL`과 같은 이메일로 사용자를 생성합니다.
3. 원하는 관리자 비밀번호를 설정합니다.
4. SQL Editor에서 아래 SQL을 실행해 관리자 역할을 부여합니다.

```sql
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email = 'admin@summer.local';
```

5. `schema.sql`을 SQL Editor에서 실행해 테이블, Storage 버킷, RLS 정책을 만듭니다.
6. 이미 로그인한 상태에서 역할을 바꿨다면 로그아웃 후 다시 로그인합니다.

## ID와 비밀번호

- 화면에서 입력하는 ID: `admin`
- Supabase 사용자 이메일: `VITE_ADMIN_EMAIL` 값
- 비밀번호: Supabase Dashboard에서 설정한 값

`4321` 같은 4자리 비밀번호는 쉽게 추측할 수 있어 공개 배포에는 권장하지 않습니다.
Supabase의 최소 비밀번호 길이 설정에서 거부될 수도 있으므로 가능하면 8자 이상의
비밀번호를 사용하세요. 비밀번호를 React 코드나 Git 저장소에 직접 적지 마세요.
