const axios = require("axios");
const faker = require("faker");

const IDEA_GENERATOR_URL = "https://appideagenerator.com/call.php";
const IDEA_API_URL = "http://localhost:4000";

const randomInt = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
  const { data } = await axios.get(IDEA_GENERATOR_URL);
  return data.replace(/\n/g, "");
};

const generateUser = async () => {
  const { data } = await axios.post(`${IDEA_API_URL}/register`, {
    username: faker.internet.userName(),
    password: "Password"
  });
  return data.token;
};

const postNewIdea = async token => {
  const idea = await generateIdea();
  const { data } = await axios.post(
    `${IDEA_API_URL}/api/ideas`,
    {
      idea,
      description: faker.lorem.paragraph()
    },
    {
      headers: { authorization: `Bearer ${token}` }
    }
  );
  console.log(data);
};

(async () => {
  const randUserNum = randomInt();
  const randIdeaNum = randomInt();
  for (let i = 0; i < randUserNum; i++) {
    const token = await generateUser();
    for (let j = 0; j < randIdeaNum; j++) {
      await postNewIdea(token);
    }
  }
  console.log("\n---------- Fake data has been generated! ----------\n");
})();
