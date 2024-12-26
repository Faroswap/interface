'use server';

import { WidgetProps } from '@dodoex/widgets';
import Widget from './Widget';
import { fetchTokenList } from '@/constants/apiServer';

export default async function WidgetServer({
  children,
  ...props
}: React.PropsWithChildren<WidgetProps>) {
  const { tokenList, data } = await fetchTokenList();

  return (
    <Widget tokenList={tokenList} initialDataTokenList={data} {...props}>
      {children}
    </Widget>
  );
}
