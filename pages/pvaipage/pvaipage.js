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
    player1boardSrc:"/images/aiplayerboard.png",
    player2boardSrc:"/images/player2board.png",
    profilephoto1Src:"https://img1.imgtp.com/2023/10/09/Kgk14CQQ.jpg",
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
    showHouseBoardUp:false,
    userInputgames:1,
    userInputchips:2,
    Multiplying: 1,
    player1: [] ,
    player2: [],
    isPlayer1Done: false, // 表示玩家1是否完成选择
    isPlayer2Done: false,
    showLockText: false,  // 是否显示“请选择需要锁定的骰子”文本
    showLockText2: true,
    showChipChoice: false, // 是否显示“请选择筹码：”文本和筹码选择
    showChipChoice2: false, 
    isPlayer1Chiped: false,
    isPlayer2Chiped: false,
    throwRounds:1,
    roundscoreDifference : 0,
    robotmutiplying: 0 ,
    targetPenta: false ,
    targetQuadra: false ,
    targetSmallStraight : false ,
    targetLargeStraight : false ,
    targetBeforeSmallStraight : false ,
    targetBeforeQuadra : false , 
    targetTwoPairs : false ,
    targetSinglePair : false ,
    completeSmallStraight : false ,
    completeBeforeSmallStraight : false ,
    completeSinglePair : false ,
    completeTwoPairs : false ,
    completeTriple : false ,
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
    //  this.testRobotDecision();
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
    // this.setData({
    //     isPlayer1Done: true,
    //     showLockText: false,
    //     showChipChoice: true
    // });

  },
  onLockDicesClick2: function(e) {
    if(this.data.isPlayer2Done){
      return ;
    }
    this.setData({
        isPlayer2Done: true,
        showLockText2: false,
        showChipChoice2: true,
        isPlayer1Done: true,
        showLockText: false,
        // showChipChoice: true
    });
    let player2Values = this.extractDiceValues(this.data.player2);
    //let robotDecision = this.robotDecisionFunction(this.data.player1, player2Values);  // 传递player2的value数组给机器人的决策函数
    // 更新机器人的骰子状态
    this.setData({
      player1: this.robotDecisionFunction(this.data.player1, player2Values)
    });

  },

  // 提取骰子的value列表函数
  extractDiceValues: function(playerDices) {
    let values = [];
    for(let i = 0; i < playerDices.length; i++) {
      values.push(playerDices[i].value);
    }
    return values;
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
        showLockText: false,
        showLockText2: true,
        throwRounds : this.data.throwRounds + 1
    });
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
    let mutiplyingValue = Number(e.currentTarget.dataset.value);
    this.setData({
        showChipChoice2: false,
        isPlayer2Chiped: true,
        Multiplying: this.data.Multiplying + mutiplyingValue + Number(this.data.robotmutiplying)
    });
    this.rethrowAndReset();
    if (this.data.throwRounds === 3) {
      this.endRound();
    }
  },
  scoreCalculate2: function(){
    let player2BaseScore = 0;
    for (let dice of this.data.player2) {
      player2BaseScore += dice.value;
    }
    let player2ExtraScore = this.getExtraScore(this.data.player2);
    let player2TotalScore = player2BaseScore + player2ExtraScore;
    return player2TotalScore
  },
  scoreCalculate1: function(){
    let player1BaseScore = 0;
    for (let dice of this.data.player1) {
      player1BaseScore += dice.value;
    }
    let player1ExtraScore = this.getExtraScore(this.data.player1);
    let player1TotalScore = player1BaseScore + player1ExtraScore;
    return player1TotalScore
  },
  endRound: function() {
    let that = this;
    // 减少玩家指定的回合数
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
    // 用setData将得分差异存储到data中
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
          duration: 5000, 
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
          title: '恭喜Pluribus获胜。5秒后返回主页面',
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
        showLockText: false,
        showLockText2: true,
        targetBeforeQuadra : false ,
        targetBeforeSmallStraight :false ,
        targetLargeStraight :false ,
        targetTwoPairs : false ,
        targetLargeStraight : false ,
        completeSmallStraight : false ,
        completeSinglePair : false ,
        completeTwoPairs : false ,
        completeTriple :false ,
        completeBeforeSmallStraight :false ,
      });
    }else{
      this.resultGame();
    }
  },
  resultGame: function() {
    if(this.data.playerchips1>this.data.playerchips2){
      wx.showToast({
        title: '恭喜Pluribus获胜。5秒后返回主页面',
        icon: 'none',
        duration: 5000, // 持续10秒
        complete: function() {
            // 5秒后跳转到mainpage
            setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
            }, 5000);
        }
      });
    }else if(this.data.playerchips1<this.data.playerchips2){
      wx.showToast({
        title: '恭喜玩家二获胜。5秒后返回主页面',
        icon: 'none',
        duration: 5000, // 持续10秒
        complete: function() {
            // 10秒后跳转到mainpage
            setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
            }, 5000);
        }
      });
    }else{
      wx.showToast({
        title: 'Pluribus和玩家棋逢对手，未能决出胜负',
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
    wx.redirectTo({
      url: '/pages/choosemode/choosemode'
    });
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  robotDecisionFunction: function(player1Dices, player2Values) {
    let self = this 
    let player1Values = this.extractDiceValues(this.data.player1)
    let totalScore1 = this.scoreCalculate1()+this.getExtraScore(this.data.player1)
    let totalScore2 = this.scoreCalculate2()+this.getExtraScore(this.data.player2)
    this.data.robotmutiplying = 0 ;
    if(this.isPenta(player1Values)){
      console.log('isPenta');
      this.data.player1 = this.choosePentaLock(this.data.player1) ;
      this.data.robotmutiplying = 3 ;
    }
    if(this.isLargeStraight(player1Values)){
      console.log('isLargeStraight');
      this.chooseLargeStraightLock();
      if(this.isPenta(player2Values)&&this.scoreCalculate1()>this.scoreCalculate2()){
        this.data.robotmutiplying = 3 ;
      }else if(totalScore1>totalScore2){
        this.data.robotmutiplying = 3 ;
      }
      console.log(this.data.player1);
    }
    if(this.isSmallStraight(player1Values)){
      console.log('isSmallStraight');
      this.chooseSmallStraightLock()  ;
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 2 ;
      }else{
        this.data.robotmutiplying = 0 ;
      }
    }
    if(this.isBeforeSmallStraight(player1Values)&&this.isBeforeQuadra(player1Values)&&this.data.throwRounds===1){
      if(this.isToChooseTripleOrStraight()){
        this.chooseTripleLock(this.data.player1);
      }else{
        this.chooseBeforeSmallStraight();
      }
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 1 ;
      }
    }
    if(this.isBeforeQuadra(player1Values)&&this.data.completeBeforeSmallStraight===false){
      let player = this.chooseTripleLock(this.data.player1) ;
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 1 ;
      }
      console.log('isTriple') ;
      this.setData({
        player1 : player 
      });
    }
    if (this.isBeforeSmallStraight(player1Values)&&this.data.completeTriple===false&&this.data.completeBeforeSmallStraight===false&&this.data.completeSinglePair===false&&this.data.completeTwoPairs===false) {
      console.log("The dice values have the potential to form a small straight on the next roll!");
      this.chooseBeforeSmallStraight() ;
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 1 ;
      }
    }
    if (this.isQuadra(player1Values)){
      console.log('isQuadra');
      this.data.player1 = this.chooseQuadraLock(this.data.player1) ;
      if(this.isQuadra(player2Values)&&totalScore1>totalScore2){
        this.data.robotmutiplying = 3;
      }else if(totalScore1>totalScore2){
        this.data.robotmutiplying = 2;
      }else{
        this.data.robotmutiplying = 0 ;
      }
    }
    if(this.isSinglePair(player1Values)){
      console.log('isSinglePair')
      this.chooseSinglePair() ; 
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 1 ;
      }
    }
    if(this.isTwoPairs(player1Values)&&this.data.throwRounds===1&&!this.isBeforeQuadra(player1Values)&&!this.isBeforeSmallStraight(player1Values)){
      console.log('isTwoPairsisTwoPairsisTwoPairsisTwoPairsisTwoPairs') ;
      this.chooseTwoPairs() ;
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 1 ;
      }
    }
    if(this.isTwoPairs(player1Values)&&this.data.throwRounds===2&&this.data.isSinglePair===false){
      if(this.data.completeTwoPairs===false){
        console.log('isTwoPairsisTwoPairsisTwoPairsisTwoPairsisTwoPairs') ;
        this.chooseTwoPairs() ;
        if(totalScore1>totalScore2){
          this.data.robotmutiplying = 1 ;
        }
      }
      if(this.data.completeTriple){
        console.log('isTwoPairsisTwoPairsisTwoPairsisTwoPairsisTwoPairs') ;
        this.chooseTwoPairs() ;
        if(totalScore1>totalScore2){
          this.data.robotmutiplying = 1 ;
        }
      }
    }
    if(this.isBeforeQuadra(player1Values)&&(this.data.completeSinglePair||this.data.completeTwoPairs)){
      let player = this.chooseTripleLock(this.data.player1) ;
      this.data.player1 = player ;
      if(totalScore1>totalScore2){
        this.data.robotmutiplying = 1 ;
      }
    }
    //根据player2Values数组来决策
    console.log("玩家一的得分为:",this.scoreCalculate1())
    return player1Dices;
  },

  isBeforeSmallStraight: function(values) {
    const threeSequences = [
        "1,2,3", "2,3,4", "3,4,5", "4,5,6"  // 三连续序列
    ];
    const almostFourSequences = [
        "1,2,4", "1,3,4", "2,3,5", "2,4,5", "3,4,6", "3,5,6"  // 缺少一个数的四连续序列
    ];
    const fourSequences = ["1,2,3,4", "2,3,4,5", "3,4,5,6"];  // 完整的四连续序列
    // 去除数组中的重复项
    let uniqueValues = Array.from(new Set(values));
    let sortedValues = uniqueValues.sort((a, b) => a - b).join(",");
    // 检查是否存在四连续序列
    for (let seq of fourSequences) {
        if (sortedValues.includes(seq)) {
            return false;
        }
    }
    // 遍历可能的序列，并检查去重后的玩家骰子值中是否包含它们
    for (let seq of threeSequences.concat(almostFourSequences)) {
        if (sortedValues.includes(seq)) {
            this.setData({ targetBeforeSmallStraight: true });
            return true;
        }
    }
    return false;
    },

    isBeforeQuadra: function(values) {
      let count = [0, 0, 0, 0, 0, 0]; // 为每个数字初始化计数器
      for (let v of values) {
          count[v - 1]++; // 计数每个数字
      }
      for (let c of count) {
          if (c === 3) {
              this.setData({ targetBeforeQuadra: true });
              this.data.completeTriple = true ;
              return true; // 如果我们找到三个相同的数字
          } else if (c >= 4) {
              return false; // 如果找到四个或更多相同的数字
          }
      }
      return false; 
  },

  isQuadra: function(values) {
    let count = [0, 0, 0, 0, 0, 0]; // 为每个数字初始化计数器
    for (let v of values) {
        count[v - 1]++; // 计数每个数字
    }
    for (let c of count) {
        if (c === 4) {
            this.setData({ targetQuadra: true }); 
            return true; // 如果我们找到四个相同的数字
        } else if (c === 5) {
            return false; // 如果找到五个相同的数字
        }
    }
    return false; 
  },

  isSmallStraight: function(values) {
    let sortedValues = [...new Set(values)].sort(); // 去重并排序
    console.log(sortedValues);
    for (let i = 0; i < sortedValues.length - 3; i++) {
        if (sortedValues[i + 3] - sortedValues[i] === 3) { 
            // 检查连续的四个值
            if (sortedValues.length===4 || sortedValues[sortedValues.length-1]-sortedValues[0]===5) {
                // 确保没有连续的五个值
                console.log('SmallStraightSmallStraightSmallStraightSmallStraightSmallStraightSmallStraight')
                this.setData({ targetSmallStraight: true });
                return true;
            }
        }
    }
    return false;
  },

  isPenta: function(values) {
    let count = [0, 0, 0, 0, 0, 0]; // 为每个数字初始化计数器
    for (let v of values) {
        count[v - 1]++; // 计数每个数字
    }
    for (let c of count) {
        if (c === 5) {
            this.setData({ targetPenta: true });
            return true; // 如果找到五个相同的数字
        }
    }
    return false; 
  },
  
  isLargeStraight: function(values) {
    const sortedValues = values.slice().sort(); 
    if (JSON.stringify(sortedValues) === JSON.stringify([1, 2, 3, 4, 5]) ||
        JSON.stringify(sortedValues) === JSON.stringify([2, 3, 4, 5, 6])) {
        this.setData({ targetLargeStraight: true });
        console.log('大顺子')
        return true;
    }
    return false;
  },

  isTwoPairs: function(diceValues) {
    // 排序
    let sortedValues = [...diceValues].sort().join("");
    // 匹配数字序列
    let twoPairsPatterns = [
      "11225", "12255", "11255", "11226", "12266", "11266",
      "11335", "13355", "11355", "11336", "13366", "11366",
      "11445", "14455", "11455", "11446", "14466", "11466",
      "11556", "15566", "11566", "22336", "23366", "22366",
      "22446", "24466", "22466", "22556", "25566", "22566",
      "11122","11222","11333","11133","11444","11144","11555","11155","11666","11166","22333","22233","22444","22244","22555","22255","22666","22266","33444","33344","33555","33355","33666","33366","44555","44455","44466","44666","55666","55566"
    ];
  
    if (twoPairsPatterns.includes(sortedValues)) {
      this.setData({ targetTwoPairs: true });
      return true;
    }
    return false;
  },
  isSinglePair: function(diceValues) {
    // 排序
    let sortedValues = [...diceValues].sort().join("");
    // 匹配数字序列
    let singlePairPatterns = [
      "11256", "12256", "12556", "12566"
    ];
    if (singlePairPatterns.includes(sortedValues)) {
      this.setData({ targetSinglePair: true });
      console.log("只有一对骰子相同只有一对骰子相同只有一对骰子相同只有一对骰子相同只有一对骰子相同只有一对骰子相同")
      return true;
    }
    return false;
  },
  choosePentaLock: function(player1) {
    let valueCounter = {};
    // 统计每个骰子值的出现次数
    player1.forEach(die => {
        if (valueCounter[die.value]) {
            valueCounter[die.value]++;
        } else {
            valueCounter[die.value] = 1;
        }
    });
    // 找到一个值出现了5次
    let pentaValue = Object.keys(valueCounter).find(key => valueCounter[key] === 5);
    if (pentaValue) {
        let lockCount = 0;
        for (let i = 0; i < player1.length; i++) {
            if (lockCount < 5) {
                player1[i].isLocked = true;
                lockCount++;
            }
        }
    }
    return player1;
  },
  chooseQuadraLock: function(player1) {
    let valueCounter = {};
    // 统计每个骰子值的出现次数
    player1.forEach(die => {
        if (valueCounter[die.value]) {
            valueCounter[die.value]++;
        } else {
            valueCounter[die.value] = 1;
        }
    });
    // 找到一个值出现了4次，但没有出现5次的情况
    let quadraValue = Object.keys(valueCounter).find(key => valueCounter[key] === 4);
    if (quadraValue) {
        let lockCount = 0;
        for (let i = 0; i < player1.length; i++) {
            if (player1[i].value == quadraValue && lockCount < 4) {
                player1[i].isLocked = true;
                lockCount++;
            }
        }
    }
    console.log(player1);
    return player1;
  },
  chooseTripleLock: function(player1) {
    let valueCounter = {};
    // 统计每个骰子值的出现次数
    player1.forEach(die => {
        if (valueCounter[die.value]) {
            valueCounter[die.value]++;
        } else {
            valueCounter[die.value] = 1;
        }
    });
    // 找到一个值出现了3次，但没有出现4次或5次的情况
    let tripleValue = Object.keys(valueCounter).find(key => valueCounter[key] === 3);
    if (tripleValue) {
        let lockCount = 0;
        for (let i = 0; i < player1.length; i++) {
            if (player1[i].value == tripleValue && lockCount < 3) {
                player1[i].isLocked = true;
                lockCount++;
            }
        }
    }
    this.data.completeTriple === true ;
    console.log(player1);
    return player1;
  },
  chooseLargeStraightLock: function() {
    for (let i = 0; i < 5; i++) {
      this.data.player1[i].isLocked = true;
    }
  },

  chooseSmallStraightLock: function() {
    console.log("执行chooseSmallStraightLock");
    let count = 0 ;
    let indices = Array.from({length: this.data.player1.length}, (_, i) => i);  // [0, 1, 2, 3, 4]
    let mark = 6 ;
    console.log(indices) ;
    indices.sort((a, b) => this.data.player1[a].value - this.data.player1[b].value);  // 按骰子的值排序索引
    console.log(indices) ;
    if(this.data.player1[indices[4]].value - this.data.player1[indices[3]].value ==0){
      mark = 4 ;
    }
    for(let i = 0; i < 4; i++) {  // 只有两种连续的四个数字的可能性
        if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value !==1){
          if(this.data.player1[indices[i+1]].value  - this.data.player1[indices[i]].value !==0){
            mark = i
            count = 0 ;
          }
          if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===0){
            mark = i ;
          }
        }
        if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===1) {
            count++ ;
            console.log("小顺子统计:",count);
            // 使用已排序的索引来锁定骰子
            if(count===3){
              console.log('mark的值为：',mark)
              for(let i = 0; i < 5; i++){
                if(i!==mark){
                  this.data.player1[indices[i]].isLocked = true;
                }
              }
              this.data.completeSmallStraight = true ; 
              break;
            }
        }
    }
    console.log(this.data.player1) ;
  },
  chooseSinglePair: function() {
    //let count = 0 ;
    let indices = Array.from({length: this.data.player1.length}, (_, i) => i);  // [0, 1, 2, 3, 4]
    let mark = 6 ;
    let flag = 0 ;
    console.log(indices) ;
    indices.sort((a, b) => this.data.player1[a].value - this.data.player1[b].value);  // 按骰子的值排序索引
    for(let i = 0; i < 4; i++) {  // 只有一组两个相同数字，且没有其他情况
        if(this.data.player1[indices[i+1]].value  - this.data.player1[indices[i]].value ==0){
           mark = i ;
           break ;
        }
    }
    if(this.data.player1[indices[3]].value  - this.data.player1[indices[2]].value ==1){
    	flag=1;
    	this.data.player1[indices[2]].isLocked = true;
      this.data.player1[indices[3]].isLocked = true;
      this.data.player1[indices[4]].isLocked = true;
    }
    for(let i = 0; i < 4; i++){
      if(i===mark&&flag===0){
        this.data.player1[indices[i]].isLocked = true;
        this.data.player1[indices[i+1]].isLocked = true;
      }
    }
    this.data.completeSinglePair = true ;
    console.log(this.data.player1) ;
  },

  chooseTwoPairs: function() {
    console.log('开始锁定两对骰子开始锁定两对骰子开始锁定两对骰子');
    //let count = 0 ;
    let indices = Array.from({length: this.data.player1.length}, (_, i) => i);  // [0, 1, 2, 3, 4]
    let mark1 = 6 ;
    let mark2 = 8 ;
    console.log(indices) ;
    indices.sort((a, b) => this.data.player1[a].value - this.data.player1[b].value);  // 按骰子的值排序索引
    for(let i = 0; i < 4; i++) {  // 只有一组两个相同数字，且没有其他情况
        if(this.data.player1[indices[i+1]].value  - this.data.player1[indices[i]].value ==0){
           mark1 = i ;
           break ;
        }
    }
    for(let i = 0; i < 4; i++) {  // 只有一组两个相同数字，且没有其他情况
      if(this.data.player1[indices[i+1]].value  - this.data.player1[indices[i]].value ==0 && i!==mark1){
         mark2 = i ;
         break ;
      }
    }
    for(let i = 0; i < 5; i++){
      if(i===mark2){
        this.data.player1[indices[i]].isLocked = true;
        this.data.player1[indices[i+1]].isLocked = true;
      }
    }
    if(this.data.player1[indices[mark2]].value===6&&this.data.player1[indices[mark2-1]].value===5){
      this.data.player1[indices[mark2-1]].isLocked = true ;
    }
    if(this.data.player1[indices[mark2]].value===6&&this.data.player1[indices[mark1]].value===5){
      this.data.player1[indices[mark2-1]].isLocked = true ;
      this.data.player1[indices[mark2-2]].isLocked = true ;
    }
    this.data.completeTwoPairs = true ;
    console.log(this.data.player1) ;
  },

chooseSmallStraightLock: function() {
    console.log("执行chooseSmallStraightLock");
    let count = 0 ;
    let indices = Array.from({length: this.data.player1.length}, (_, i) => i);  // [0, 1, 2, 3, 4]
    let mark = 6 ;
    console.log(indices) ;
    indices.sort((a, b) => this.data.player1[a].value - this.data.player1[b].value);  // 按骰子的值排序索引
    console.log(indices) ;
    if(this.data.player1[indices[4]].value - this.data.player1[indices[3]].value ==0){
      if(this.data.player1[indices[3]].isLocked){mark=4}else{mark=3}
    }
    for(let i = 0; i < 4; i++) {  // 只有两种连续的四个数字的可能性
        if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value !==1){
          if(this.data.player1[indices[i+1]].value  - this.data.player1[indices[i]].value !==0){
            mark = i
            count = 0 ;
          }
          if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===0){
            if(this.data.player1[indices[i+1]].isLocked){
              mark = i 
            }else{
              mark = i+1
            }
          }
        }
        if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===1) {
            count++ ;
            console.log("小顺子统计:",count);
            // 使用已排序的索引来锁定骰子
            if(count===3){
              console.log('mark的值为：',mark)
              for(let i = 0; i < 5; i++){
                if(i!==mark){
                  this.data.player1[indices[i]].isLocked = true;
                }
              }
              this.data.completeSmallStraight = true ; 
              break;
            }
        }
    }
    console.log(this.data.player1) ;
  },

  chooseBeforeSmallStraight: function() {
    console.log("执行chooseBeforeSmallStraight");
    let count = 0 ;
    let indices = Array.from({length: this.data.player1.length}, (_, i) => i);  // [0, 1, 2, 3, 4]
    let mark = 6 ;
    let mark1 = 8 ;
    let mark2 = 8 ;
    let begin = 0 ;
    let choice1 = 5;
    let choice2 = 5;
    let choice3 = 5;
    let flag1 = 0 ;
    let flag2 = 0 ;
    let mkflag = 0 ;
    console.log(indices) ;
    indices.sort((a, b) => this.data.player1[a].value - this.data.player1[b].value);  // 按骰子的值排序索引
    console.log(indices) ;
    //判断缺中间的小顺
    for(let i = 0; i < 4; i++){ 
      if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value===2){
        if(i===0){
          let lastValue = this.data.player1[indices[i+1]].value+1 ;
          for(let j=0; j<5;j++){
            if(this.data.player1[indices[j]].value===lastValue){
              choice1 = 0;
              choice2 = 1;
              choice3 = j;
              flag2 = 1 ;
            }
          }
        }else if(i===3){
          let frontValue = this.data.player1[indices[i]].value-1 ;
          for(let j=0; j<5;j++){
            if(this.data.player1[indices[j]].value===frontValue){
              choice1 = j ;
              choice2 = 3 ;
              choice3 = 4 ;
              flag2 = 1 ;
            }
          }
        }else{
          for(let j=0;j<5;j++){
            let frontValue = this.data.player1[indices[i]].value-1 ;
            let lastValue = this.data.player1[indices[i+1]].value+1 ;
            if(this.data.player1[indices[j]].value===frontValue||this.data.player1[indices[j]].value===lastValue){
              choice1 = i ;
              choice2 = i+1 ;
              choice3 = j ;
              flag2 = 1 ;
            }
          }
        }
      }
    }
    // 判断缺头尾的小顺
    for(let i = 0; i < 4; i++) {  
        if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value !==1){
          if(this.data.player1[indices[i+1]].value  - this.data.player1[indices[i]].value !==0){
            count = 0 ;
          }
          if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===0){
            if(mkflag===0){
              mark1 = i ;
              mkflag = 1 ;
            }
          }
          if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===0 && i!==mark1){
            mark2 = i ;
          }
        }
        if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value ===1) {
            count++ ;
            // 使用已排序的索引来锁定骰子
            if(count===2){
              let stop = i+1 ;
              for(let i = 0; i < 4; i++){
                if(mark1!==8&&mark2!==8) {break ;}
                if(mark1!==8&&mark2===8) {
                  if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value > 1){
                    if(i===0) {begin=1}
                    if(i===1) (begin=2)
                    if(i===3) {begin=0}
                  }
                }
                if(mark1===8&&mark2===8) {
                  if(this.data.player1[indices[i+1]].value - this.data.player1[indices[i]].value > 1){
                    if(stop===3) {begin=1}
                    if(stop===4) {begin=2}
                  }
                }
              }
              console.log('在BeforeSmallStraight里的mark的值为：',mark) ;
              console.log('在BeforeSmallStraight里的stop的值为：',stop) ;
              console.log('在BeforeSmallStraight里的begin的值为：',begin) ;
              if(flag2===0){
                console.log("实行一方案");
                for(let i = begin; i <= stop; i++){
                  if(i!==mark1&&i!=mark2&&i!==mark){
                    this.data.player1[indices[i]].isLocked = true;
                  }
                }
                this.data.completeBeforeSmallStraight = true ; 
                flag1 = 1 ;
              }
              if(flag2===1){
                if(this.data.player1[indices[4]].value-this.data.player1[indices[3]].value===1&&this.data.player1[indices[4]].value-this.data.player1[indices[1]].value===4){
                  console.log("实行二方案");
                  for(let j = begin; j <= stop; j++){
                    if(j!==mark1&&j!=mark2&&j!==mark){
                      this.data.player1[indices[j]].isLocked = true;
                    }
                  }
                  this.data.completeBeforeSmallStraight = true ; 
                  flag1 = 1 ;
                }else if(this.data.player1[indices[4]].value-this.data.player1[indices[3]].value===2&&this.data.player1[indices[4]].value-this.data.player1[indices[1]].value===4){
                  console.log("实行二方案");
                  for(let j = 0; j < 5; j++){
                    if(j===choice1||j===choice2||j===choice3){
                      this.data.player1[indices[j]].isLocked = true;
                    }
                  }
                  this.data.completeBeforeSmallStraight = true ; 
                }else if(this.data.player1[indices[4]].value-this.data.player1[indices[1]].value===2){
                  console.log("实行一方案");
                  for(let j = begin; j <= stop; j++){
                    if(j!==mark1&&j!=mark2&&j!==mark){
                      this.data.player1[indices[j]].isLocked = true;
                    }
                  }
                  this.data.completeBeforeSmallStraight = true ; 
                  flag1 = 1 ;
                }else if(this.data.player1[indices[4]].value-this.data.player1[indices[1]].value===3){
                  console.log("实行二方案");
                  for(let j = 0; j < 5; j++){
                    if(j===choice1||j===choice2||j===choice3){
                      this.data.player1[indices[j]].isLocked = true;
                    }
                  }
                  this.data.completeBeforeSmallStraight = true ; 
                }else if(this.data.player1[indices[4]].value-this.data.player1[indices[0]].value===5&&this.data.player1[indices[4]].value-this.data.player1[indices[2]].value===2){
                  console.log("实行一方案");
                  for(let j = begin; j <= stop; j++){
                    if(j!==mark1&&j!=mark2&&j!==mark){
                      this.data.player1[indices[j]].isLocked = true;
                    }
                  }
                  this.data.completeBeforeSmallStraight = true ; 
                  flag1 = 1 ;
                }else{
                  console.log("实行二方案");
                  for(let j = 0; j < 5; j++){
                    if(j===choice1||j===choice2||j===choice3){
                      this.data.player1[indices[j]].isLocked = true;
                    }
                  }
                  this.data.completeBeforeSmallStraight = true ; 
                }
              }
              break;
            }
        }
    }
    if(flag1===0){
      console.log("实行二方案");
      for(let j = 0; j < 5; j++){
        if(j===choice1||j===choice2||j===choice3){
          this.data.player1[indices[j]].isLocked = true;
        }
      }
      this.data.completeBeforeSmallStraight = true ; 
    }
    console.log(this.data.player1) ;
    console.log("begin:",begin);
    console.log("mark1:",mark1);
    console.log("mark2:",mark2);
    console.log("choice1:",indices[choice1]);
    console.log("choice2:",indices[choice2]);
    console.log("choice3:",indices[choice3]);
  },
  isToChooseTripleOrStraight: function() {
    console.log("isToChooseTripleOrStraight");
    let count = 0 ;
    let indices = Array.from({length: this.data.player1.length}, (_, i) => i);  // [0, 1, 2, 3, 4]
    let mark = 6 ;
    console.log(indices) ;
    indices.sort((a, b) => this.data.player1[a].value - this.data.player1[b].value);  // 按骰子的值排序索引
    console.log(indices) ;
    if(this.data.player1[indices[4]].value - this.data.player1[indices[3]].value===0){
      return true ;
    }else{return false;}
  },

// testRobotDecision: function(){
//     for(let i=1;i<50;i++){
//         let player = this.generateDiceValues();
//         let playerValues = this.extractDiceValues(player);
//         console.log(playerValues);
//         console.log("是否三连：",this.isBeforeQuadra(playerValues));
//         console.log("是否三顺：",this.isBeforeSmallStraight(playerValues));
//       }
//     }
})

