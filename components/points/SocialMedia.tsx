import { EmptyDataIcon } from '@dodoex/components';

export default function SocialMedia() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-[400px] md:h-[287px] w-full bg-paper rounded-3xl">
      <EmptyDataIcon
        sx={{
          width: 60,
          height: 60,
          borderRadius: 8,
        }}
      />
      <div className="text-secondary">Stay tuned for more details</div>
    </div>
  );
}
