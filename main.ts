namespace SpriteKind {
    export const Card = SpriteKind.create()
}
function StartBlackJack () {
    playerDrawTime = false
    Bet = 0
    betplaced = false
    Money = 500
    Stay = false
    dealerScore = 0
    textSprite2 = 0
    playerCardPosX = 17
    textSprite = textsprite.create("")
    TextSprite4 = textsprite.create("")
    textSprite.setPosition(15, 110)
    DealerCardPosX = 17
    first_Turn = true
    playerTurn = true
    cardPoint = true
    DealerValue = 0
    PlayerValue = 0
    scene.setBackgroundImage(assets.image`Background`)
    SetDeck()
    DealerFirstDraw()
    playerDrawTime = true
    TextSprite4.setText("Money: " + convertToText(Money))
    TextSprite4.setPosition(115, 110)
}
browserEvents.S.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (Black_JackStart) {
        Stay = true
        console.log(Stay)
        Dealer_Draw_After_Play_stay()
    }
})
browserEvents.F.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (Black_JackStart && playerDrawTime) {
        if (!(betplaced)) {
            Bet = game.askForNumber("What's your bet")
            betplaced = true
            while (Bet > Money) {
                story.printCharacterText("Sorry you don't have enough money for that", "Dealer")
                Bet = game.askForNumber("What's your bet")
            }
        } else {
            if (first_Turn) {
                for (let index = 0; index < 2; index++) {
                    getCard()
                }
            } else {
                if (PlayerValue > 21) {
                    Game_End(false)
                } else if (PlayerValue == 21) {
                    Game_End(true)
                } else {
                    getCard()
                }
            }
        }
    }
})
function Dealer_Draw_After_Play_stay () {
    console.log(DealerValue < PlayerValue)
    while (DealerValue < PlayerValue) {
        random_deck = deck[randint(0, 3)]
        CurrentCard = random_deck._pickRandom()
        cards = sprites.create(CurrentCard, SpriteKind.Card)
        cards.setPosition(DealerCardPosX, 15)
        DealerCardPosX += cards.width + 1
        DealerValue += randint(1, 11)
        if (random_deck.indexOf(CurrentCard) >= 10) {
            DealerValue = DealerValue + 10
        } else if (random_deck.indexOf(CurrentCard) == 0) {
            if (Math.percentChance(50)) {
                DealerValue = DealerValue + 1
            } else {
                DealerValue = DealerValue + 11
            }
        } else {
            DealerValue = DealerValue + (random_deck.indexOf(CurrentCard) + 1)
        }
        pause(100)
    }
    IsPlayerOver21(PlayerValue, DealerValue)
}
function getCard () {
    if (!(Stay)) {
        random_deck = deck[randint(0, 3)]
        CurrentCard = random_deck._pickRandom()
        cards = sprites.create(assets.image`myImage0`, SpriteKind.Card)
        CardAnim = [assets.image`myImage0`, assets.image`myImage1`, CurrentCard]
        animation.runImageAnimation(
        cards,
        CardAnim,
        120,
        false
        )
        pause(600)
        first_Turn = false
        if (random_deck.indexOf(CurrentCard) >= 10) {
            PlayerValue = PlayerValue + 10
        } else if (random_deck.indexOf(CurrentCard) == 0) {
            pick_ace = game.ask("A for 1", "B for 11")
            if (pick_ace == true) {
                PlayerValue = PlayerValue + 1
            } else {
                PlayerValue = PlayerValue + 11
            }
        } else {
            PlayerValue = PlayerValue + (random_deck.indexOf(CurrentCard) + 1)
        }
        cards.setPosition(playerCardPosX, 96)
        playerCardPosX += cards.width + 1
        if (PlayerValue > 21) {
            playerDrawTime = false
            pause(2000)
            Game_End(false)
        } else if (PlayerValue == 21) {
            playerDrawTime = false
            pause(2000)
            Game_End(true)
        }
    }
}
function SetDeck () {
    HeartHouse = [
    assets.image`cardSuitHA`,
    assets.image`cardSuitH2`,
    assets.image`cardSuitH3`,
    assets.image`cardSuitH4`,
    assets.image`cardSuitH5`,
    assets.image`cardSuitH6`,
    assets.image`cardSuitH7`,
    assets.image`cardSuitH8`,
    assets.image`cardSuitH9`,
    assets.image`cardSuitH10`,
    assets.image`cardSuitHU`,
    assets.image`cardSuitHQ`,
    assets.image`cardSuitHK`
    ]
    DiamondHouse = [
    assets.image`cardSuitDA`,
    assets.image`cardSuitD2`,
    assets.image`cardSuitD3`,
    assets.image`cardSuitD4`,
    assets.image`cardSuitD5`,
    assets.image`cardSuitD6`,
    assets.image`cardSuitD7`,
    assets.image`cardSuitD8`,
    assets.image`cardSuitD9`,
    assets.image`cardSuitD10`,
    assets.image`cardSuitDU`,
    assets.image`cardSuitDQ`,
    assets.image`cardSuitDK`
    ]
    SpadeHouse = [
    assets.image`cardSuitSA`,
    assets.image`cardSuitS2`,
    assets.image`cardSuitS3`,
    assets.image`cardSuitS4`,
    assets.image`cardSuitS5`,
    assets.image`cardSuitS6`,
    assets.image`cardSuitS7`,
    assets.image`cardSuitS8`,
    assets.image`cardSuitS9`,
    assets.image`cardSuitS10`,
    assets.image`cardSuitSU`,
    assets.image`cardSuitSQ`,
    assets.image`cardSuitSK`
    ]
    ClubHouse = [
    assets.image`cardSuitCA`,
    assets.image`cardSuitC2`,
    assets.image`cardSuitC3`,
    assets.image`cardSuitC4`,
    assets.image`cardSuitC5`,
    assets.image`cardSuitC6`,
    assets.image`cardSuitC7`,
    assets.image`cardSuitC8`,
    assets.image`cardSuitC9`,
    assets.image`cardSuitC10`,
    assets.image`cardSuitCU`,
    assets.image`cardSuitCQ`,
    assets.image`cardSuitCK`
    ]
    deck = [
    ClubHouse,
    DiamondHouse,
    HeartHouse,
    SpadeHouse
    ]
}
function MenuUI () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Noclip?"),
    miniMenu.createMenuItem("how to play")
    )
    myMenu.setFrame(img`
        ..77277227722772277777..
        .7dd72dd72dd72dd7277dd7.
        2dddd72dd72dd72dd72dddd2
        2dddd77227722772277dddd2
        27dd7111111111111117dd72
        772711111111111111117727
        7277111111111111111172d7
        27d211111111111111112dd2
        2dd211111111111111112d72
        7d2711111111111111117727
        7277111111111111111172d7
        27d211111111111111112dd2
        2dd211111111111111112d72
        7d2711111111111111117727
        7277111111111111111172d7
        27d211111111111111112dd2
        2dd211111111111111112d72
        7d2711111111111111117727
        727711111111111111117277
        27dd7111111111111117dd72
        2dddd77227722772277dddd2
        2dddd27dd27dd27dd27dddd2
        .2dd7727dd27dd27dd27dd2.
        ..22277227722772277222..
        `)
    myMenu.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            Black_JackStart = true
            myMenu.close()
            sprites.destroy(NameSprite)
            sprites.destroy(textSprite3)
            StartBlackJack()
        } else {
            myMenu.close()
            myMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("F to Draw more cards"),
            miniMenu.createMenuItem("S to stay"),
            miniMenu.createMenuItem("Back")
            )
            myMenu.setPosition(scene.screenWidth() / 2 - 8, scene.screenHeight() / 2 - 0)
            myMenu.setFrame(img`
                ..77277227722772277777..
                .7dd72dd72dd72dd7277dd7.
                2dddd72dd72dd72dd72dddd2
                2dddd77227722772277dddd2
                27dd7111111111111117dd72
                772711111111111111117727
                7277111111111111111172d7
                27d211111111111111112dd2
                2dd211111111111111112d72
                7d2711111111111111117727
                7277111111111111111172d7
                27d211111111111111112dd2
                2dd211111111111111112d72
                7d2711111111111111117727
                7277111111111111111172d7
                27d211111111111111112dd2
                2dd211111111111111112d72
                7d2711111111111111117727
                727711111111111111117277
                27dd7111111111111117dd72
                2dddd77227722772277dddd2
                2dddd27dd27dd27dd27dddd2
                .2dd7727dd27dd27dd27dd2.
                ..22277227722772277222..
                `)
            myMenu.setDimensions(140, 40)
            myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (selectedIndex == 2) {
                    myMenu.close()
                    MenuUI()
                }
            })
        }
    })
}
function IsPlayerOver21 (playerValue: number, dealerValue: number) {
    if (dealerValue > playerValue && dealerValue <= 21) {
        Game_End(false)
    } else if (dealerValue < playerValue || dealerValue > 21) {
        Game_End(true)
    }
}
function Game_End (Win: boolean) {
    if (Win) {
        Money += Bet
        DealerCardPosX = 17
        sprites.destroyAllSpritesOfKind(SpriteKind.Card)
        DealerValue = 0
        PlayerValue = 0
        pause(5000)
        DealerFirstDraw()
        playerDrawTime = true
        Stay = false
        first_Turn = true
        playerDrawTime = false
        betplaced = false
        playerCardPosX = 17
    } else {
        Money += Bet * -1
        if (Money == 0) {
            game.setGameOverMessage(false, "You're out of Cash")
            game.gameOver(false)
        } else {
            sprites.destroyAllSpritesOfKind(SpriteKind.Card)
            Stay = false
            first_Turn = true
            playerDrawTime = false
            betplaced = false
            playerCardPosX = 17
            DealerCardPosX = 17
            DealerValue = 0
            PlayerValue = 0
            pause(5000)
            DealerFirstDraw()
            pause(2000)
            playerDrawTime = true
        }
    }
    TextSprite4.setText("Money: " + convertToText(Money))
}
function DealerFirstDraw () {
    DealerHidden = sprites.create(assets.image`card base`, SpriteKind.Card)
    DealerHidden.setPosition(DealerCardPosX, 15)
    DealerCardPosX += DealerHidden.width + 1
    random_deck = deck[randint(0, 3)]
    CurrentCard = random_deck._pickRandom()
    cards = sprites.create(CurrentCard, SpriteKind.Card)
    cards.setPosition(DealerCardPosX, 15)
    DealerValue += randint(1, 11)
    if (random_deck.indexOf(CurrentCard) >= 10) {
        DealerValue = DealerValue + 10
    } else if (random_deck.indexOf(CurrentCard) == 0) {
        if (Math.percentChance(50)) {
            DealerValue = DealerValue + 1
        } else {
            DealerValue = DealerValue + 11
        }
    } else {
        DealerValue = DealerValue + (random_deck.indexOf(CurrentCard) + 1)
    }
    DealerCardPosX += cards.width + 1
}
let DealerHidden: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let ClubHouse: Image[] = []
let SpadeHouse: Image[] = []
let DiamondHouse: Image[] = []
let HeartHouse: Image[] = []
let pick_ace = false
let CardAnim: Image[] = []
let cards: Sprite = null
let CurrentCard: Image = null
let deck: Image[][] = []
let random_deck: Image[] = []
let PlayerValue = 0
let DealerValue = 0
let cardPoint = false
let playerTurn = false
let first_Turn = false
let DealerCardPosX = 0
let TextSprite4: TextSprite = null
let textSprite: TextSprite = null
let playerCardPosX = 0
let textSprite2 = 0
let dealerScore = 0
let Stay = false
let Money = 0
let betplaced = false
let Bet = 0
let playerDrawTime = false
let NameSprite: Sprite = null
let textSprite3: TextSprite = null
let Black_JackStart = false
Black_JackStart = false
music.play(music.createSoundEffect(WaveShape.Noise, 5000, 5000, 114, 112, 5000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.LoopingInBackground)
scene.setBackgroundColor(1)
pause(100)
scene.setBackgroundColor(15)
pause(100)
scene.setBackgroundColor(1)
pause(100)
scene.setBackgroundColor(15)
pause(100)
scene.setBackgroundColor(1)
pause(100)
scene.setBackgroundColor(15)
pause(100)
scene.setBackgroundColor(1)
pause(100)
scene.setBackgroundColor(15)
color.startFade(color.Black, color.originalPalette, 2000)
scene.setBackgroundImage(assets.image`Background`)
textSprite3 = textsprite.create("Pc Game only")
NameSprite = sprites.create(assets.image`Blackjack`, SpriteKind.Player)
textSprite3.setPosition(scene.screenHeight() / 2 + 17, scene.screenWidth() / 2 + 10)
timer.background(function () {
    while (Black_JackStart == false) {
        NameSprite.setFlag(SpriteFlag.Invisible, true)
        pause(50)
        NameSprite.setFlag(SpriteFlag.Invisible, false)
        pause(50)
        NameSprite.setFlag(SpriteFlag.Invisible, true)
        pause(50)
        NameSprite.setFlag(SpriteFlag.Invisible, false)
        pause(2000)
    }
})
NameSprite.setPosition(scene.screenWidth() / 2, 20)
MenuUI()
game.onUpdate(function () {
    if (Black_JackStart) {
        TextSprite4.setText("Money: " + convertToText(Money))
        textSprite.setText("Points: " + convertToText(PlayerValue))
    }
})
