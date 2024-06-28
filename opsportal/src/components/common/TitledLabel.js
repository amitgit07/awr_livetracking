const TitledLabel = ({ title, text }) => (
  <p style={styles.container}>
    <strong>{title}:</strong> {text}
  </p>
);

const styles = {
  container: {
    marginBottom: "10px",
  },
};

export default TitledLabel;