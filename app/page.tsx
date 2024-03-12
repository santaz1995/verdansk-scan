import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const users = [] as User[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
