import Reward from '@/components/reward';
import { fetchTokenList } from '@/constants/apiServer';

export default async function Page() {
  const { data: initialDataTokenList } = await fetchTokenList();
  return <Reward initialDataTokenList={initialDataTokenList} />;
}
