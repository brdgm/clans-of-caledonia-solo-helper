import PlayerColor from '@/services/enum/PlayerColor'

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.BLUE:
      return '#36b4e5'
    case PlayerColor.WHITE:
      return '#ececec'
    case PlayerColor.RED:
      return '#e22726'
    case PlayerColor.BLACK:
      return '#000000'
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
