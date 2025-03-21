'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { User } from '@/types/User';

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const dummyData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com' },
  { id: 4, name: 'Diana Martinez', email: 'diana@example.com' },
  { id: 5, name: 'Ethan Carter', email: 'ethan@example.com' },
  { id: 6, name: 'Fiona Green', email: 'fiona@example.com' },
  { id: 7, name: 'George Brown', email: 'george@example.com' },
  { id: 8, name: 'Hannah White', email: 'hannah@example.com' },
  { id: 9, name: 'Ian Black', email: 'ian@example.com' },
  { id: 10, name: 'Julia Adams', email: 'julia@example.com' },
];

const UserTable = () => {
  const [data, setData] = useState<User[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(dummyData.length);

  useEffect(() => {
    // Simulating an API call with dummy data
    setTimeout(() => {
      setData(dummyData);
    }, 500); // Fake loading delay
  }, []);

  const fetchData = async ({ pageIndex, pageSize, sorting, filters }: any) => {
    console.log('Fetching data...', { pageIndex, pageSize, sorting, filters });

    // Simulating server-side pagination (just slicing dummy data)
    const paginatedData = dummyData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    setData(paginatedData);

    // Uncomment this when using API:
    /*
    const params = new URLSearchParams({
      page: (pageIndex + 1).toString(),
      size: pageSize.toString(),
    });

    sorting.forEach((s: any) => params.append('sort', `${s.id}:${s.desc ? 'desc' : 'asc'}`));
    filters.forEach((f: any) => params.append(`filter_${f.id}`, f.value));

    const res = await fetch(`/api/users?${params}`);
    const json = await res.json();
    setData(json.data);
    setTotal(json.total);
    */
  };

  return <DataTable data={data} columns={columns} totalCount={total} fetchData={fetchData} />;
};

export default UserTable;
