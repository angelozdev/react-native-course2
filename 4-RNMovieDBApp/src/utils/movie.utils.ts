export function getColorByVoteAverage(voteAverage?: number) {
  if (voteAverage === undefined) return 'gray'
  if (voteAverage >= 8) return '#4caf50'
  else if (voteAverage >= 6) return '#ff9800'
  else if (voteAverage >= 4) return '#ff5722'
  return '#f44336'
}

export function getIconByVoteAverage(voteAverage?: number) {
  if (voteAverage === undefined) return '﹖'
  if (voteAverage >= 8) return '✨'
  else if (voteAverage >= 6) return '👍'
  else if (voteAverage >= 4) return '👎'
  return '💩'
}
