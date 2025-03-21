import MyForm from '@/components/shared/ExampleForm';
import UserTable from '@/components/feature/UserTable';
import SwapyDemo from '@/components/feature/SwapyDemo';
import Calendar from '@/components/shared/Calendar';

export default function Help() {
  return (
    <>
      <div>Hello From Help page</div>
      <MyForm />
      <h1>Swapy + MUI Demo</h1>
      <SwapyDemo />
      <Calendar />
      <UserTable />
    </>
  );
}
