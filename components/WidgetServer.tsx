'use server';

import { WidgetProps } from '@dodoex/widgets';
import Widget from './Widget';
import { fetchTokenList } from '@/constants/apiServer';

type WidgetServerProps = WidgetProps & {
  urlFromTokenAddress?: string;
  urlToTokenAddress?: string;
};

export default async function WidgetServer({
  children,
  ...props
}: React.PropsWithChildren<WidgetServerProps>) {
  const { tokenList, data } = await fetchTokenList();

  return (
    <Widget tokenList={tokenList} initialDataTokenList={data} {...props}>
      {children}
    </Widget>
  );
}
