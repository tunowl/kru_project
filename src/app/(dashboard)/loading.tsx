import { User, Presentation, Building2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="container animate-in fade-in duration-300">
            {/* Header Skeleton */}
            <div className="page-header border-b border-slate-200 pb-4 mb-6">
                <div className="h-8 w-64 bg-slate-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 w-96 bg-slate-100 rounded-md animate-pulse"></div>
            </div>

            {/* Selectors Skeleton */}
            <div className="flex gap-4 mb-8">
                <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Draft Timeline Skeleton */}
            <div className="h-4 w-48 bg-slate-200 rounded-md animate-pulse mb-4"></div>
            <div className="flex w-full h-24 mb-8 rounded-lg overflow-hidden gap-1">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 bg-slate-100 animate-pulse border border-slate-200"></div>
                ))}
            </div>

            {/* Main Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="h-72 bg-slate-100 rounded-xl animate-pulse border border-slate-200 lg:col-span-1"></div>
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="h-32 bg-slate-100 rounded-xl animate-pulse border border-slate-200"></div>
                    <div className="h-32 bg-slate-100 rounded-xl animate-pulse border border-slate-200"></div>
                </div>
            </div>
        </div>
    );
}