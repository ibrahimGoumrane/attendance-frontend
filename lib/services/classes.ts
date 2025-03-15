export async function getAllClasses() {
  const classes = await fetch(`${process.env.API_URL}/classes/`);
  const json = await classes.json();
  return json;
}