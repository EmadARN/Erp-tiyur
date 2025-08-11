import ErrorLayout from "../components/ErrorLayout";

const ServerErrorPage = () => {
  return (
    <ErrorLayout
      code="500"
      title="Server Error"
      description="There was a problem with the server. Please try again later."
    />
  );
};

export default ServerErrorPage;
