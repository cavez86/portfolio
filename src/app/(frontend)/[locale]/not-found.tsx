import ErrorPage from '@/components/ErrorPage';

export default async function NotFound() {
  return <ErrorPage errorCode={404} />;
}
