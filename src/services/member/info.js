import { info } from '@/apis/member'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await info()

  return {
    email: response.security.email,
    phone: response.security.phone,
    birthday: response.basic_info.birthday,
    gender: response.basic_info.gender,
    username: response.basic_info.username,
    name: response.basic_info.name,
    nickname: response.basic_info.nick_name,
    registerDate: response.basic_info.register_date,
  }
}
