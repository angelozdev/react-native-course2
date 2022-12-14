export function getColorByVoteAverage(voteAverage?: number) {
  if (voteAverage === undefined) return 'gray'
  if (voteAverage >= 8) return '#4caf50'
  else if (voteAverage >= 6) return '#ff9800'
  else if (voteAverage >= 4) return '#ff5722'
  return '#f44336'
}

export function getIconByVoteAverage(voteAverage?: number) {
  if (voteAverage === undefined) return 'īš'
  if (voteAverage >= 8) return 'â¨'
  else if (voteAverage >= 6) return 'đ'
  else if (voteAverage >= 4) return 'đ'
  return 'đŠ'
}
