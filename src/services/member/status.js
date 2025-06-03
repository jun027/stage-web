import { status } from '@/apis/member'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await status()

  return {
    memberId: response.MemberId,
    memberLevel: response.MemberLevel,
    vipLevel: response.VipLevel,
    status: response.status,
    balance: response.Balance,
  }
}
