const fs = require('fs');
const generateReadme = require('./profileGenerator');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = {
  name: 'What is your name? ',
  about: 'Tell us about yourself: ',
  skills: 'Enter your skills (comma-separated): ',
  github: 'What is your GitHub username? ',
  social: 'Enter your social links (format: platform,url;platform,url) or press enter to skip: '
};

const getUserInput = async () => {
  const data = {};
  
  for (const [key, question] of Object.entries(questions)) {
    data[key] = await new Promise(resolve => {
      readline.question(question, resolve);
    });
  }
  
  return {
    ...data,
    skills: data.skills.split(',').map(s => s.trim()),




    social: data.social && data.social.trim() 
      ? data.social.split(';').map(s => {
          const [platform, url] = s.split(',');
          return { platform: platform.trim(), url: url.trim() };
        })
      : []
  };
};

const main = async () => {
  const userData = await getUserInput();
  const readme = generateReadme(userData);
  
  fs.writeFileSync('README.md', readme);

  console.log('README.md has been generated successfully! 🎉');
  readline.close();
};


main();