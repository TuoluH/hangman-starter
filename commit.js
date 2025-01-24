// import { Octokit } from "@octokit/rest"

// const octokit = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
// })

// async function getSHA(path) {
//     const result = await octokit.repos.getContent({
//       owner: "TuoluH",
//       repo: "hangman-starter",
//       path,
//     })
  
//     const sha = result?.data?.sha
  
//     return sha
// }

// async function saveHighScore(score) {
//     const path = `${slug(score.title)}.mdx`
//     const sha = await getSHA(path)
  
//     const result = await octokit.repos.createOrUpdateFileContents({
//       owner: "TuoluH",
//       repo: "hangman-starter",
//       path,
//       message: `Save score "${score.title}"`,
//       content: Base64.encode(`${frontmatter(score)}\n\n${score.markdown}`),
//       sha,
//     })
  
//     return result?.status || 500
// }

