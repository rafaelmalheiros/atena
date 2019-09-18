const generateRankingMessage = async ({ ranking, user, monthName }) => {
  const month = monthName ? ` de ${monthName}` : ''
  if (!ranking) {
    return { msg: 'Ops. Não conseguimos gerar o ranking nesse momento. :/' }
  }

  if (ranking.length < 5) {
    return {
      msg:
        'Ops. Ainda não temos dados suficientes para gerar o ranking neste momento. :/'
    }
  }

  let response = {
    msg: `Olá ${
      user.name.split(' ')[0]
    }! Veja as primeiras pessoas do ranking${month}:`,
    attachments: []
  }

  const topFive = ranking.slice(0, 5)

  response.attachments = topFive.map((impulser, index) => ({
    text: `${index + 1}º lugar está ${
      impulser.rocketId === user.rocketId ? 'você' : impulser.name
    } com ${month ? impulser.monthlyScore : impulser.score} XP, no nível ${
      impulser.level
    }`
  }))

  const userPosition = user.isCoreTeam
    ? 'coreTeam'
    : ranking.findIndex(u => user.rocketId === u.rocketId) + 1

  let message = `Ah, e tu estás na posição ${userPosition} do ranking`

  if (userPosition === 'coreTeam') {
    message = `Psiu... Tu não estás no ranking pois pertence ao coreTeam. :/`
  }
  if (userPosition < 0 && userPosition < 6) {
    message = `Parabéns! Tu estás entre os 5 primeiros colocados`
  }
  if (userPosition === 0) {
    message = `Ah, e tu ainda não pontuaste neste mês`
  }

  response.attachments.push({
    text: message
  })

  return response
}

export default {
  generateRankingMessage
}
