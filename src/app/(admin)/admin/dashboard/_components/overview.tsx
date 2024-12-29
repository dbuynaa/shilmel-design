'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "1-р",
    total: 1324,
  },
  {
    name: "2-р",
    total: 1765,
  },
  {
    name: "3-р",
    total: 1324,
  },
  {
    name: "4-р",
    total: 1435,
  },
  {
    name: "5-р",
    total: 2145,
  },
  {
    name: "6-р",
    total: 1876,
  },
  {
    name: "7-р",
    total: 2367,
  },
  {
    name: "8-р",
    total: 1987,
  },
  {
    name: "9-р",
    total: 2345,
  },
  {
    name: "10-р",
    total: 2021,
  },
  {
    name: "11-р",
    total: 1865,
  },
  {
    name: "12-р",
    total: 2342,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value/1000}k`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

