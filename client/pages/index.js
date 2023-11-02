import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return (
    <>
      <h1>LAnding Page</h1>
      <h2>{currentUser}</h2>
    </>
  )
};

LandingPage.getInitialProps = async context => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};




export default LandingPage;
