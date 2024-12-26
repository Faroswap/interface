'use client';

import Widget from '@/components/Widget';
import { MiningCreate } from '@dodoex/widgets';
import { useRouter } from 'next/navigation';

import 'react-datetime/css/react-datetime.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/index.css';

export default function Home() {
  const { push, back } = useRouter();

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="relative w-full bg-paper">
        <Widget>
          <MiningCreate
            handleGotoCreatePool={() => push('/pool/create')}
            handleGotoMiningList={() => push(`/mining`)}
            handleGoBack={() => back()}
          />
        </Widget>
      </div>
    </div>
  );
}
