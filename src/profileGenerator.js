const fs = require('fs');

const generateReadme = (data) => {
  const template = `# Hi there 👋 I'm ${data.name}

## About Me
${data.about}

## Skills
${data.skills.map(skill => `- ${skill}`).join('\n')}

## Connect with Me
${data.social.map(link => `- [${link.platform}](${link.url})`).join('\n')}

## Stats
![GitHub stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true)
`;

  return template;
};

module.exports = generateReadme;
