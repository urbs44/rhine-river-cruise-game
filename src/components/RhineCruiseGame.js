// src/components/RhineCruiseGame.js
import React, { useState, useEffect, useRef } from 'react';
import { portsData, obstacles, powerUps, riverSegments, gameSettings } from '../data/gameData';
import styles from '../styles/Game.module.css';

const RhineCruiseGame = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 500 });
  const [playerHealth, setPlayerHealth] = useState(gameSettings.playerInitialHealth);
  const [currentPort, setCurrentPort] = useState(0);
  const [collectedSouvenirs, setCollectedSouvenirs] = useState([]);
  const [activeObstacles, setActiveObstacles] = useState([]);
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [playerPowerUps, setPlayerPowerUps] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [keyState, setKeyState] = useState({});
  
  const gameAreaRef = useRef(null);
  const animationFrameId = useRef(null);
  const lastObstacleTime = useRef(0);
  const lastPowerUpTime = useRef(0);
  
  // Initialize game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPlayerPosition({ x: 50, y: 500 });
    setPlayerHealth(gameSettings.playerInitialHealth);
    setCurrentPort(0);
    setCollectedSouvenirs([]);
    setActiveObstacles([]);
    setActivePowerUps([]);
    setPlayerPowerUps([]);
    setBullets([]);
  };
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeyState(prev => ({ ...prev, [e.key]: true }));
      
      // Fire bullets with spacebar
      if (e.code === 'Space' && gameStarted && !gameOver) {
        setBullets(prev => [...prev, {
          x: playerPosition.x + 25, // Center of the ship
          y: playerPosition.y,
          id: Date.now()
        }]);
      }
    };
    
    const handleKeyUp = (e) => {
      setKeyState(prev => ({ ...prev, [e.key]: false }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver, playerPosition]);
  
  // Main game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    let lastTimestamp = 0;
    const playerBaseSpeed = gameSettings.playerBaseSpeed;
    
    const gameLoop = (timestamp) => {
      // Calculate time delta
      const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 16 : 1;
      lastTimestamp = timestamp;
      
      // Update player position based on keyboard input
      updatePlayerPosition(deltaTime, playerBaseSpeed);
      
      // Generate obstacles and power-ups
      generateObstaclesAndPowerUps(timestamp);
      
      // Update obstacle positions
      updateObstacles(deltaTime);
      
      // Update power-up positions
      updatePowerUps(deltaTime);
      
      // Update bullet positions
      updateBullets(deltaTime);
      
      // Check for collisions
      checkCollisions();
      
      // Check if player reached a port
      checkPortReached();
      
      // Check player health
      if (playerHealth <= 0) {
        setGameOver(true);
        return;
      }
      
      // Continue game loop
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };
    
    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);
    
    // Clean up
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, gameOver, keyState, playerHealth, currentPort, activeObstacles, activePowerUps, playerPowerUps, bullets]);
  
  // Update player position based on keyboard input
  const updatePlayerPosition = (deltaTime, baseSpeed) => {
    const speedBoost = playerPowerUps.find(pu => pu.effect === 'speed')?.value || 1;
    const speed = baseSpeed * speedBoost * deltaTime;
    
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    
    if (keyState['ArrowLeft'] || keyState['a']) newX -= speed;
    if (keyState['ArrowRight'] || keyState['d']) newX += speed;
    if (keyState['ArrowUp'] || keyState['w']) newY -= speed;
    if (keyState['ArrowDown'] || keyState['s']) newY += speed;
    
    // Keep player within bounds
    newX = Math.max(0, Math.min(gameSettings.gameWidth - 50, newX));
    newY = Math.max(0, Math.min(gameSettings.gameHeight - 50, newY));
    
    setPlayerPosition({ x: newX, y: newY });
  };
  
  // Generate obstacles and power-ups at random intervals
  const generateObstaclesAndPowerUps = (timestamp) => {
    // Generate obstacles
    if (timestamp - lastObstacleTime.current > 1000) {
      obstacles.forEach(obstacle => {
        if (Math.random() < obstacle.frequency) {
          const newObstacle = {
            ...obstacle,
            x: Math.random() * (gameSettings.gameWidth - 30),
            y: -30,
            id: Date.now() + Math.random()
          };
          setActiveObstacles(prev => [...prev, newObstacle]);
        }
      });
      lastObstacleTime.current = timestamp;
    }
    
    // Generate power-ups
    if (timestamp - lastPowerUpTime.current > 2000) {
      powerUps.forEach(powerUp => {
        if (Math.random() < powerUp.frequency) {
          const newPowerUp = {
            ...powerUp,
            x: Math.random() * (gameSettings.gameWidth - 30),
            y: -30,
            id: Date.now() + Math.random()
          };
          setActivePowerUps(prev => [...prev, newPowerUp]);
        }
      });
      lastPowerUpTime.current = timestamp;
    }
  };
  
  // Update obstacle positions
  const updateObstacles = (deltaTime) => {
    setActiveObstacles(prev => 
      prev.filter(obstacle => {
        const newY = obstacle.y + obstacle.speed * deltaTime;
        obstacle.y = newY;
        return newY < gameSettings.gameHeight; // Keep obstacles on screen
      })
    );
  };
  
  // Update power-up positions
  const updatePowerUps = (deltaTime) => {
    setActivePowerUps(prev => 
      prev.filter(powerUp => {
        const newY = powerUp.y + 2 * deltaTime; // Power-ups move slower than obstacles
        powerUp.y = newY;
        return newY < gameSettings.gameHeight; // Keep power-ups on screen
      })
    );
    
    // Update player power-up durations
    const currentTime = Date.now();
    setPlayerPowerUps(prev => 
      prev.filter(powerUp => {
        return !powerUp.endTime || currentTime < powerUp.endTime;
      })
    );
  };
  
  // Update bullet positions
  const updateBullets = (deltaTime) => {
    setBullets(prev => 
      prev.filter(bullet => {
        const newY = bullet.y - gameSettings.bulletSpeed * deltaTime;
        bullet.y = newY;
        return newY > 0; // Remove bullets that go off-screen
      })
    );
  };
  
  // Check for collisions between player, obstacles, power-ups, and bullets
  const checkCollisions = () => {
    const playerRect = {
      x: playerPosition.x,
      y: playerPosition.y,
      width: 50,
      height: 50
    };
    
    // Check for collisions with obstacles
    setActiveObstacles(prev => 
      prev.filter(obstacle => {
        const obstacleRect = {
          x: obstacle.x,
          y: obstacle.y,
          width: 30,
          height: 30
        };
        
        // Check if any bullets hit the obstacle
        let bulletHit = false;
        setBullets(bullets => 
          bullets.filter(bullet => {
            const bulletRect = {
              x: bullet.x,
              y: bullet.y,
              width: 5,
              height: 10
            };
            
            const hit = checkRectCollision(bulletRect, obstacleRect);
            if (hit) bulletHit = true;
            return !hit; // Remove bullets that hit obstacles
          })
        );
        
        if (bulletHit) {
          setScore(prev => prev + 10); // Award points for destroying obstacles
          return false; // Remove the obstacle
        }
        
        // Check if obstacle hit player
        if (checkRectCollision(playerRect, obstacleRect)) {
          const isInvulnerable = playerPowerUps.some(pu => pu.effect === 'invulnerability');
          if (!isInvulnerable) {
            setPlayerHealth(prev => prev - obstacle.damage);
          }
          return false; // Remove the obstacle
        }
        
        return true; // Keep the obstacle
      })
    );
    
    // Check for collisions with power-ups
    setActivePowerUps(prev => 
      prev.filter(powerUp => {
        const powerUpRect = {
          x: powerUp.x,
          y: powerUp.y,
          width: 30,
          height: 30
        };
        
        if (checkRectCollision(playerRect, powerUpRect)) {
          // Apply power-up effect
          if (powerUp.effect === 'health') {
            setPlayerHealth(prev => Math.min(gameSettings.playerInitialHealth, prev + powerUp.value));
          } else {
            const currentTime = Date.now();
            setPlayerPowerUps(prev => [
              ...prev.filter(pu => pu.effect !== powerUp.effect), // Replace existing power-up of same type
              {
                ...powerUp,
                endTime: powerUp.duration ? currentTime + powerUp.duration : null
              }
            ]);
          }
          return false; // Remove the power-up
        }
        
        return true; // Keep the power-up
      })
    );
  };
  
  // Helper function to check for rectangle collision
  const checkRectCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };
  
  // Check if player reached a port
  const checkPortReached = () => {
    if (currentPort >= portsData.length - 1) return; // Already at final port
    
    const nextPort = portsData[currentPort + 1];
    const portRect = {
      x: nextPort.coordinates.x * (gameSettings.gameWidth / 100) - 25,
      y: nextPort.coordinates.y * (gameSettings.gameHeight / 100) - 25,
      width: 50,
      height: 50
    };
    
    const playerRect = {
      x: playerPosition.x,
      y: playerPosition.y,
      width: 50,
      height: 50
    };
    
    if (checkRectCollision(playerRect, portRect)) {
      // Collect souvenir from the port
      const souvenir = {
        name: nextPort.souvenirName,
        points: nextPort.souvenirPoints,
        port: nextPort.name
      };
      
      // Update game state
      setCollectedSouvenirs(prev => [...prev, souvenir]);
      setCurrentPort(prev => prev + 1);
      setScore(prev => {
        const pointsMultiplier = playerPowerUps.find(pu => pu.effect === 'points')?.value || 1;
        return prev + (nextPort.souvenirPoints * pointsMultiplier);
      });
      
      // Check if reached final port
      if (currentPort + 1 >= portsData.length - 1) {
        // Game completed
        setScore(prev => prev + 1000); // Bonus for completing the journey
      }
    }
  };
  
  // Render game UI
  return (
    <div className={styles.gameContainer}>
      {!gameStarted ? (
        <div className={styles.startScreen}>
          <h1>Rhine River Cruise Adventure</h1>
          <p>Navigate your cruise ship along the Rhine River, collecting souvenirs at each port.</p>
          <p>Use arrow keys or WASD to move, spacebar to shoot.</p>
          <button className={styles.startButton} onClick={startGame}>Start Cruise</button>
        </div>
      ) : gameOver ? (
        <div className={styles.gameOverScreen}>
          <h1>Cruise Over!</h1>
          <p>Your final score: {score}</p>
          <p>Souvenirs collected: {collectedSouvenirs.length}/{portsData.length - 1}</p>
          <button className={styles.startButton} onClick={startGame}>Try Again</button>
        </div>
      ) : (
        <div className={styles.gamePlayArea} ref={gameAreaRef}>
          {/* Render player ship */}
          <div
            className={styles.playerShip}
            style={{
              left: `${playerPosition.x}px`,
              top: `${playerPosition.y}px`,
              backgroundColor: playerPowerUps.some(pu => pu.effect === 'invulnerability') ? '#ffff00' : '#0077be'
            }}
          >
            🚢
          </div>
          
          {/* Render bullets */}
          {bullets.map(bullet => (
            <div
              key={bullet.id}
              className={styles.bullet}
              style={{ left: `${bullet.x}px`, top: `${bullet.y}px` }}
            />
          ))}
          
          {/* Render obstacles */}
          {activeObstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className={styles.obstacle}
              style={{ left: `${obstacle.x}px`, top: `${obstacle.y}px` }}
            >
              {obstacle.sprite}
            </div>
          ))}
          
          {/* Render power-ups */}
          {activePowerUps.map(powerUp => (
            <div
              key={powerUp.id}
              className={styles.powerUp}
              style={{ left: `${powerUp.x}px`, top: `${powerUp.y}px` }}
            >
              {powerUp.sprite}
            </div>
          ))}
          
          {/* Render ports */}
          {portsData.map((port, index) => (
            <div
              key={port.id}
              className={`${styles.port} ${index <= currentPort ? styles.visitedPort : ''}`}
              style={{
                left: `${port.coordinates.x * (gameSettings.gameWidth / 100) - 25}px`,
                top: `${port.coordinates.y * (gameSettings.gameHeight / 100) - 25}px`
              }}
            >
              🏙️
              <div className={styles.portName}>{port.name}</div>
            </div>
          ))}
          
          {/* Game HUD */}
          <div className={styles.gameHUD}>
            <div className={styles.score}>Score: {score}</div>
            <div className={styles.health}>
              Health: {playerHealth}
              <div className={styles.healthBar}>
                <div className={styles.healthBarFill} style={{ width: `${playerHealth}%` }} />
              </div>
            </div>
            <div className={styles.currentPort}>Current Port: {portsData[currentPort].name}</div>
            <div className={styles.souvenirs}>
              Souvenirs: {collectedSouvenirs.length}/{portsData.length - 1}
            </div>
            {playerPowerUps.length > 0 && (
              <div className={styles.activePowerUps}>
                Active Power-ups:
                {playerPowerUps.map(powerUp => (
                  <span key={powerUp.type} className={styles.powerUpIndicator}>
                    {powerUp.sprite} {powerUp.type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RhineCruiseGame;