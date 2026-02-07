import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line
} from 'recharts';

interface ChartData {
    time: number;
    latency: number;
    errorRate: number;
    utilization: number;
}

interface ObservabilityChartsProps {
    chartData: ChartData[];
}

const ObservabilityCharts: React.FC<ObservabilityChartsProps> = ({ chartData }) => {
    return (
        <div className="grid gap-6">
            {/* Primary Latency Chart */}
            <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 h-64">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Endpoint Latency (ms)</h5>
                    <span className="text-blue-500 font-mono text-xs">AVG: 24.2ms</span>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 50]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                            itemStyle={{ color: '#3b82f6' }}
                            labelStyle={{ display: 'none' }}
                        />
                        <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Error Rate Chart */}
                <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 h-48">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Error Frequency (%)</h5>
                    <ResponsiveContainer width="100%" height="70%">
                        <LineChart data={chartData}>
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={[0, 5]} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px' }} labelStyle={{ display: 'none' }} />
                            <Line type="stepAfter" dataKey="errorRate" stroke="#f43f5e" strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Utilization Chart */}
                <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 h-48">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Utilization</h5>
                    <ResponsiveContainer width="100%" height="70%">
                        <AreaChart data={chartData}>
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={[0, 100]} />
                            <Area type="monotone" dataKey="utilization" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ObservabilityCharts;
