"use client"
import React, { ChangeEvent, Suspense, useState } from 'react'
import HighChart from '../globals/Highchart/HighChart';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const StockLineChart = ({ data }: { data: any }) => {
    const [alteredData, setAlteredData] = useState(data)
    const [interval, setInterval] = useState<'day' | 'week'>('day')

    const session = useSession()

    const createLineChartOptions = (data: any[], interval: 'day' | 'week') => {
        // Helper function to format date or day names
        const formatPeriod = (period: string, interval: 'day' | 'week') => {
            const date = new Date(period);
            if (interval === 'day') {
                return date.toLocaleDateString(); // Format as MM/DD/YYYY
            } else if (interval === 'week') {
                // Optionally format as week number or week start date
                const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
                return `${weekStart.toLocaleDateString()} - ${new Date(weekStart.setDate(weekStart.getDate() + 6)).toLocaleDateString()}`; // Week range
            }
            return period;
        };
    
        // Calculate the max and min y values for better spacing
        const allStockValues = data.flatMap(category => category.data.map((item:any) => parseInt(item.total_stock)));
        const maxStock = Math.max(...allStockValues);
        const minStock = Math.min(...allStockValues);
    
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: `Stock Levels Over Time (${interval.charAt(0).toUpperCase() + interval.slice(1)})`
            },
            xAxis: {
                categories: data?.length > 0 ? data[0].data.map((item: any) => formatPeriod(item.period, interval)) : [],
                title: {
                    text: 'Time Period'
                },
                labels: {
                    rotation: -45, // Rotate labels if needed to avoid overlap
                    style: {
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Total Stock'
                },
                min: Math.max(0, minStock - 5), // Adjust minimum value for better spacing
                max: maxStock + 5, // Adjust maximum value for better spacing
                tickInterval: Math.ceil((maxStock - minStock) / 10), // Adjust tick intervals for readability
                labels: {
                    format: '{value}'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: data?.map((category: any) => ({
                name: category.label,
                data: category.data.map((item: any) => ({
                    x: new Date(item.period).getDay(), // Convert to timestamp for the x-axis
                    y: parseInt(item.total_stock)
                }))
            }))
        };
    };
    

    // mutation to handle change of data
    const mutation = useMutation({
        mutationFn: async (values: any) => {
            if (session) {
                const token = session?.data as any
                console.log(token)
                const res = await axios.get(BASE_URL + "fetchstocklevelsovertime", {
                    headers: {
                        "Authorization": `Bearer ${token?.data?.access}`
                    },
                    params: {
                        interval: values.interval
                    }
                })
                if (res.status === 200) {
                    return res.data?.stockLevelsOverTime
                }
            }
            return null

        },
        onSuccess: (data) => {
            setAlteredData(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value
        mutation.mutateAsync({ interval: value })
    }

    return (
        <div className='w-full flex flex-col items-start gap-4'>
            <div className='my-2'>

                <select id="interval" name='interval' defaultValue={interval} onChange={handleChange} disabled={mutation.isPending} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-sm">

                    <option value="">Select interval</option>
                    <option value={"day"}>Day</option>
                    <option value={"week"}>Week</option>
                </select>

            </div>
            <Suspense fallback="...loading">
                {alteredData?.length > 0 ? (
                    <HighChart props={createLineChartOptions(alteredData, interval)} />

                ) : (
                    <HighChart props={createLineChartOptions(data, interval)} />

                )}
            </Suspense>
        </div>
    )
}

export default StockLineChart