export default function SectionHeader({text}: {text: string}) {
  return (
    <div className="w-full lg:hidden py-6 text-xl font-bold sticky top-0 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-md z-10">
      <p className="px-3">{text}</p>
    </div>
  );
}