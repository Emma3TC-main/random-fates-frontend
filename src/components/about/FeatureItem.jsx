function FeatureItem({ item }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="h-3 w-3 rounded-full bg-[#40CFFF]" />

      <span className="text-sm font-medium text-slate-700">{item.text}</span>
    </div>
  );
}

export default FeatureItem;
