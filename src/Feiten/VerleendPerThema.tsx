import VerleendPerThemaChart from "../Components/VerleendPerThemaChart";

const VerleendPerThema = ({ jaar }) => {
  return (
    <>
      <h2>Verleend bedrag per thema</h2>
      <p>
        Door de balk behorende bij een categorie te selecteren wordt de balk ingekort, waardoor de verhoudingen tussen
        de overige categorieën beter zichtbaar wordt. Door nogmaals op de balk te klikken krijgt de categorie zijn
        oorspronkelijke schaal.
      </p>

      <VerleendPerThemaChart jaar={jaar} />
    </>
  );
};

export default VerleendPerThema;
