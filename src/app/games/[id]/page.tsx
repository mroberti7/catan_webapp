import GamePage from '@/app/games/[id]';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <GamePage id={id} />;
};
export default Page;

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}
