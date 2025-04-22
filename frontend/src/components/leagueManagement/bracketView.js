import React from 'react';
import './EuroCupBracket.css';

const EuroCupBracket = () => {
  // 2016欧洲杯淘汰赛数据
  const rounds = [
    {
      title: "1/8决赛",
      matches: [
        ["瑞士", "波兰"],
        ["克罗地亚", "葡萄牙"],
        ["威尔士", "北爱尔兰"],
        ["匈牙利", "比利时"],
        ["德国", "斯洛伐克"],
        ["意大利", "西班牙"],
        ["法国", "爱尔兰"],
        ["英格兰", "冰岛"]
      ]
    },
    {
      title: "1/4决赛",
      matches: [
        ["波兰", "葡萄牙"],
        ["威尔士", "比利时"],
        ["德国", "意大利"],
        ["法国", "冰岛"]
      ]
    },
    {
      title: "半决赛",
      matches: [
        ["葡萄牙", "威尔士"],
        ["德国", "法国"]
      ]
    },
    {
      title: "决赛",
      matches: [
        ["葡萄牙", "法国"]
      ]
    }
  ];

  // 胜者数据
  const winners = {
    "1/8决赛": [1, 1, 0, 1, 0, 1, 0, 1], // 每场比赛的胜者索引(0或1)
    "1/4决赛": [1, 0, 1, 0],
    "半决赛": [0, 1],
    "决赛": [0]
  };

  return (
    <div className="euro-cup-bracket">
      <h1>2016年欧洲杯淘汰赛对阵图</h1>
      
      <div className="bracket-grid">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="round-column">
            <h2 className="round-title">{round.title}</h2>
            <div className="matches-container">
              {round.matches.map((match, matchIndex) => {
                const roundWinners = winners[round.title];
                const winnerIndex = roundWinners ? roundWinners[matchIndex] : -1;
                
                return (
                  <div key={matchIndex} className="match-pair">
                    <div className={`team ${winnerIndex === 0 ? 'winner' : ''}`}>
                      {match[0]}
                    </div>
                    <div className={`team ${winnerIndex === 1 ? 'winner' : ''}`}>
                      {match[1]}
                    </div>
                    
                    {/* 连接线 */}
                    {roundIndex < rounds.length - 1 && (
                      <div className={`connector connector-${matchIndex}`}>
                        <div className="connector-line"></div>
                        <div className="connector-arrow"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="footer">海南爱动体育 www.aidongw.com</div>
    </div>
  );
};

export default EuroCupBracket;