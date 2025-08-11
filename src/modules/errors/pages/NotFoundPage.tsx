import ErrorLayout from "../components/ErrorLayout";

const NotFoundPage = () => {
  return (
    <ErrorLayout
      code="404"
      title="Page Not Found"
      description="Unfortunately, the page you are looking for does not exist or has been moved."
    />
  );
};

export default NotFoundPage;
