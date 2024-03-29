// pages/pvppage/pvppage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgdimgSrc: "/images/bgdimage4.png",
    houseSrc:"/images/house.png",
    houseboardSrc:"/images/houseboard.png",
    box1Src:"/images/box1.png",
    player1boardSrc:"/images/player1board.png",
    player2boardSrc:"/images/player2board.png",
    profilephoto1Src:"https://img1.imgtp.com/2023/10/09/0A2hStQ4.png",
    profilephoto2Src:"https://img1.imgtp.com/2023/10/09/J0NzDXWz.png",
    gametableSrc:"/images/gametable.png",
    dicebuttonSrc:"/images/logo.png",
    dice1Src:"/images/dice1.png",
    dice2Src:"/images/dice2.png",
    dice3Src:"/images/dice3.png",
    dice4Src:"/images/dice4.png",
    dice5Src:"/images/dice5.png",
    dice6Src:"/images/dice6.png",
    houseboardSrc:"/images/houseboard.png",
    roundboardSrc:"/images/lock1.png",
    EastereggSrc:"https://img1.imgtp.com/2023/10/11/RA1rgBxS.png",
    showHouseBoardUp:false,
    userInputgames:1,
    userInputchips:2,
    Multiplying: 1,
    player1: [] ,
    player2: [],
    isPlayer1Done: false, // 表示玩家1是否完成选择
    isPlayer2Done: false,
    showLockText: true,  // 是否显示“请选择需要锁定的骰子”文本
    showLockText2: true,
    showChipChoice: false, // 是否显示“请选择筹码：”文本和筹码选择
    showChipChoice2: false, 
    isPlayer1Chiped: false,
    isPlayer2Chiped: false,
    throwRounds:1,
    roundscoreDifference : 0,
    showEasterEgg : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.audioCtx2 = wx.createInnerAudioContext();
    this.audioCtx2.src = '/sounds/click1.mp3';
    this.audioCtx2.volume = 0.3 ;
    this.audioCtx3 = wx.createInnerAudioContext();
    this.audioCtx3.src = '/sounds/click2.mp3';
    this.audioCtx3.volume = 0.5 ;
    this.setData({
      userInputgames: options.userInputgames,
      totalGames: options.userInputgames,
      playerchips1: options.userInputchips,
      playerchips2: options.userInputchips,
      player1: this.generateDiceValues(),
      player2: this.generateDiceValues()
     });
     console.log(this.data.playerchips1);
    // console.log(this.data.userInputchips);
  },
  generateDiceValues: function() {
    let values = [];
    for (let i = 0; i < 5; i++) {
        values.push({
            value: Math.floor(Math.random() * 6) + 1,
            isLocked: false,
            modifyPermit: true
        });
    }
    return values;
  },
  onLockDicesClick: function(e) {
    if(this.data.isPlayer1Done){
      return ;
    }
    this.setData({
        isPlayer1Done: true,
        showLockText: false,
        showChipChoice: true
    });

  },
  onLockDicesClick2: function(e) {
    if(this.data.isPlayer2Done){
      return ;
    }
    this.setData({
        isPlayer2Done: true,
        showLockText2: false,
        showChipChoice2: true
    });
    
  },
  rethrowAndReset: function() {
    let updateDice = dice => {
        if (!dice.isLocked) {
            dice.value = Math.floor(Math.random() * 6) + 1;
        } else {
            dice.modifyPermit = false;
        }
        return dice;
    };
    let player1Dices = this.data.player1.map(updateDice);
    let player2Dices = this.data.player2.map(updateDice);
    this.setData({
        player1: player1Dices,
        player2: player2Dices,
        isPlayer1Done: false,
        isPlayer2Done: false,
        isPlayer1Chiped: false,
        isPlayer2Chiped: false,        
        showLockText: true,
        showLockText2: true,
        throwRounds : this.data.throwRounds + 1
    });
    //！！！！！！！！！！！！！！！！！！！！！！！！彩蛋！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    const targetValues = [5, 3, 4, 2, 6];
    if (this.checkDiceValues(this.data.player1, targetValues) || this.checkDiceValues(this.data.player2, targetValues)) {
        this.EasterEggDisplay();
      }
    },
    EasterEggDisplay: function(){
      this.data.showEasterEgg = true ;
    },
    EasterEggTouch: function(){
      this.data.showEasterEgg = false ;
    },
  // rethrowDice: function() {
  //   let player1Dices = this.data.player1;
  //   let player2Dices = this.data.player2;
  //   player1Dices.forEach(dice => {
  //       if (!dice.isLocked) {
  //         dice.value = Math.floor(Math.random() * 6) + 1;
  //       } else {
  //         dice
  //       }
  //   });
  //   player2Dices.forEach(dice => {
  //       if (!dice.isLocked) {
  //           dice.value = Math.floor(Math.random() * 6) + 1;
  //       }
  //   });
  //   this.setData({
  //       player1: player1Dices,
  //       player2: player2Dices
  //   });
  //   },
  // resetPlayersAndDice: function() {
  //   let resetDice = dice => {
  //     if (!dice.isLocked){
  //       dice.isLocked = false 
  //     }
  //   };
  //   let player1Dices = this.data.player1.map(resetDice);
  //   let player2Dices = this.data.player2.map(resetDice);
  //   this.setData({
  //       player1: player1Dices,
  //       player2: player2Dices,
  //       isPlayer1Done: false,
  //       isPlayer2Done: false,
  //       isPlayer2Chiped: false,
  //       isPlayer2Chiped: false,
  //   });
  // },
  onChipClick: function(e) {
    let chipValue = Number(e.currentTarget.dataset.value);
    console.log(this.data.Multiplying)
    this.setData({
        showChipChoice: false,
        isPlayer1Chiped: true ,
        Multiplying: this.data.Multiplying + chipValue
    });
    if (this.data.isPlayer1Chiped && this.data.isPlayer2Chiped) {
      this.rethrowAndReset();
    }
    if (this.data.throwRounds === 3) {
      this.endRound();
    }
  },
  onChipClick2: function(e) {
    let chipValue = Number(e.currentTarget.dataset.value);
    this.setData({
        showChipChoice2: false,
        isPlayer2Chiped: true,
        Multiplying: this.data.Multiplying + chipValue
    });
    if (this.data.isPlayer1Chiped && this.data.isPlayer2Chiped) {
      this.rethrowAndReset();
    }
    if (this.data.throwRounds === 3) {
      this.endRound();
    }
  },
  endRound: function() {
    // 减少玩家指定的游戏局数
    this.setData({
        userInputgames: this.data.userInputgames - 1 ,
        roundresultShowup : 1,
    });
    let player1BaseScore = 0;
    let player2BaseScore = 0;
    // 对player1的骰子值进行累加
    for (let dice of this.data.player1) {
        player1BaseScore += dice.value;
    }
    // 对player2的骰子值进行累加
    for (let dice of this.data.player2) {
        player2BaseScore += dice.value;
    }
    // 计算额外得分
    let player1ExtraScore = this.getExtraScore(this.data.player1);
    let player2ExtraScore = this.getExtraScore(this.data.player2);
    // 计算总得分
    let player1TotalScore = player1BaseScore + player1ExtraScore;
    let player2TotalScore = player2BaseScore + player2ExtraScore;
    // 计算两位玩家的得分差异
    let scoreDifference = player1TotalScore - player2TotalScore;
    // 如果需要，你还可以用setData将这个得分差异存储到data中
    let roundchipdifference = scoreDifference * this.data.Multiplying
    console.log(this.data.Multiplying)
    console.log(scoreDifference)
    console.log(roundchipdifference)
    this.setData({
        roundscoreDifference : Number(roundchipdifference),
        playerchips1: Number(this.data.playerchips1) + Number(roundchipdifference),
        playerchips2: this.data.playerchips2 - Number(roundchipdifference)
    });
  },
  reStartRound: function(){
    console.log(this.data.roundscoreDifference)
    this.setData({
      roundresultShowup : 0,
      throwRounds : 1 ,
    });
    if (this.data.playerchips1 <= 0) {
      // 显示玩家2获胜的消息
      wx.showToast({
          title: '恭喜玩家二获胜。5秒后返回主页面',
          icon: 'none',
          duration: 5000, // 持续5秒
          complete: function() {
              // 5秒后跳转到mainpage
              setTimeout(function() {
                  wx.navigateBack({
                    delta: 2
                  })
              }, 5000);
          }
      });
      return;
  } else if (this.data.playerchips2 <= 0) {
      // 显示玩家1获胜的消息
      wx.showToast({
          title: '恭喜玩家一获胜。5秒后返回主页面',
          icon: 'none',
          duration: 5000, // 持续5秒
          complete: function() {
              // 5秒后跳转到mainpage
              setTimeout(function() {
                  wx.navigateBack({
                    delta: 2
                  })
              }, 5000);
          }
      });
      return;
    }
    // this.resultGame();
    // 如果还有更多的回合，则重置游戏
    if(Number(this.data.userInputgames)>0){
      this.setData({
        player1: this.generateDiceValues(),
        player2: this.generateDiceValues(),
        throwRounds: 1,  // 重新设置为两次重新投掷机会
        Multiplying : 1 , // 重新设置倍率
        scoreDifference : 0 , //重新设置分差
        isPlayer1Done: false,
        isPlayer2Done: false,
        isPlayer1Chiped: false,
        isPlayer2Chiped: false,        
        showLockText: true,
        showLockText2: true,
      });
    }else{
      this.resultGame();
    }
  },
  resultGame: function() {
    if(this.data.playerchips1>this.data.playerchips2){
      wx.showToast({
        title: '恭喜玩家一获胜。5秒后返回主页面',
        icon: 'none',
        duration: 5000, // 持续5秒
        complete: function() {
            // 10秒后跳转到mainpage
            setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
            }, 5000);
        }
      });
    }else if(this.data.playerchips1<this.data.playerchips2){
      wx.showToast({
        title: '恭喜玩家二下获胜。5秒后返回主页面',
        icon: 'none',
        duration: 5000, // 持续5秒
        complete: function() {
            // 5秒后跳转到mainpage
            setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
            }, 5000);
        }
      });
    }else{
      wx.showToast({
        title: '玩家一和玩家二棋逢对手，未能决出胜负',
        icon: 'none',
        duration: 5000, // 持续5秒
        complete: function() {
            // 5秒后跳转到mainpage
            setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
            }, 5000);
        }
      });
    }
  },
  toggleLock: function(e) {
    if(this.data.isPlayer1Done) {
      return;
    }
    const playerIndex = Number(e.currentTarget.dataset.index); // 获取当前骰子的索引
    // 使用 `this.data.player1[playerIndex].isLocked` 获取当前骰子的锁定状态
    const newState = !this.data.player1[playerIndex].isLocked;
    const modifyState = this.data.player1[playerIndex].modifyPermit;
    // 使用 `setData` 更新当前骰子的锁定状态
    if(modifyState){
      this.setData({
        [`player1[${playerIndex}].isLocked`]: newState
      });
    }else{
      return;
    }
  },
  toggleLock2: function(e) {
    if(this.data.isPlayer2Done) {
      return;
    }
    const playerIndex = Number(e.currentTarget.dataset.index); // 获取当前骰子的索引
    // 使用 `this.data.player1[playerIndex].isLocked` 获取当前骰子的锁定状态
    const newState = !this.data.player2[playerIndex].isLocked;
    const modifyState = this.data.player2[playerIndex].modifyPermit;
    // 使用 `setData` 更新当前骰子的锁定状态
    if(modifyState){
      this.setData({
        [`player2[${playerIndex}].isLocked`]: newState
      });
    }else{
      return;
    }
  },
  handleClick: function() {
    this.audioCtx2.play();  // 播放点击音效
  },
  handleClick2:function(){
    this.audioCtx3.play();
  },
  //显示弹出菜单栏
  showHouseBoard: function() {
    this.handleClick();
    this.setData({
        showHouseBoardUp: true
    });
  },
  // 隐藏弹出的菜单
  hideHouseBoard: function() {
    this.handleClick2();
    this.setData({
        showHouseBoardUp: false
    });
  },
  //跳转到主页
  navigateToMainpage: function() {
    this.handleClick2();
    wx.navigateBack({
        delta: 2
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getExtraScore: function(dices) {
    let counts = {};
    let score = 0;
    // 计算每个数字出现的次数
    for (let dice of dices) {
        counts[dice.value] = (counts[dice.value] || 0) + 1;
    }
    // 根据出现次数计算额外得分
    for (let key in counts) {
        if (counts[key] === 3) score += 10;
        if (counts[key] === 4) score += 40;
        if (counts[key] === 5) score += 100;
    }
    // 获取五个骰子值并排序
    let values = dices.map(dice => dice.value).sort((a, b) => a - b);
    // 去除重复值
    let uniqueValues = [...new Set(values)];
    // 检查是否存在连续数字
    for (let i = 0; i < uniqueValues.length - 3; i++) {
        if (uniqueValues[i + 3] - uniqueValues[i] === 3 && 
            uniqueValues[i + 2] - uniqueValues[i + 1] === 1 &&
            uniqueValues[i + 2] - uniqueValues[i] === 2) {
            score += 30;
            // 找到一个连续的就跳出循环，避免多次加分
        }
    }
    // 检查是否出现两次两个相同的数字
    let pairs = 0;
    for (let key in counts) {
        if (counts[key] === 2) pairs++;
        if (counts[key] === 3) pairs++;
    }
    if (pairs === 2) score += 10;
    console.log(score)
    return score;
  },
  checkDiceValues: function(player, targetValues) {
    for (let i = 0; i < player.length; i++) {
        if (player[i].value !== targetValues[i]) {
            return false;
        }
    }
    return true;
  }
})