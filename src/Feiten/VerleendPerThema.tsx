import VerleendPerThemaChart from "../Components/VerleendPerThemaChart";

const VerleendPerThema = ({ jaar }) => {
  return (
    <>
      <h2>Verleend bedrag per thema</h2>

      <VerleendPerThemaChart jaar={jaar} />
    </>
  );
};

export default VerleendPerThema;
