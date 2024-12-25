export default function StatCard({
  count,
  forStat,
  icon,
}: {
  count: string;
  forStat: string;
  icon: string;
}) {
  return (
    <div className="dark:shadwo-lg flex h-fit w-fit select-none flex-col items-center gap-2 rounded-md bg-neutral-300 px-20 py-5 shadow-xl dark:bg-neutral-400 dark:shadow-white">
      <img src={icon} alt={forStat + "icon"} className="size-20" />
      <h2 className="text-xl font-bold">{count}</h2>
      <p>{forStat}</p>
    </div>
  );
}
