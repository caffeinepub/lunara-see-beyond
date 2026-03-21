import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dices,
  Flame,
  Gamepad2,
  RefreshCw,
  RotateCcw,
  Send,
  Swords,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Playtime helpers ──────────────────────────────────────────
const STORAGE_KEY = "lunara_arcadia_playtime";

function loadPlaytime(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePlaytime(data: Record<string, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `0m ${seconds}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

function formatMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

// ── Truth or Dare ───────────────────────────────────────────
const TRUTHS = [
  "What's your biggest fear?",
  "What's the most embarrassing thing you've done?",
  "What's a secret you've never told anyone?",
  "Who was your first crush?",
  "What's the biggest lie you've told?",
  "Have you ever cheated on a test?",
  "What do you find most attractive in a person?",
  "What's the weirdest dream you've had?",
  "What's something you regret?",
  "If you could change one thing about yourself, what would it be?",
  "What's your most used emoji and why?",
  "What's a habit you're ashamed of?",
  "Have you ever snuck out?",
  "Who in this group do you trust most?",
  "What's your guilty pleasure?",
];
const DARES = [
  "Do your best dance move for 30 seconds",
  "Text someone you haven't talked to in months",
  "Speak in an accent for the next 2 rounds",
  "Do 10 push-ups right now",
  "Say something nice to every person in the group",
  "Sing the chorus of any song",
  "Act like a cat for 1 minute",
  "Share your most recent photo from your camera roll (describe it)",
  "Call someone and say 'I need to tell you something' then hang up",
  "Do your best celebrity impression",
  "Post a selfie right now",
  "Talk in rhymes for the next 3 turns",
  "Swap a clothing item with someone",
  "Do the worm",
  "Narrate your life like a nature documentary for 1 minute",
];

function TruthOrDare() {
  const [mode, setMode] = useState<"truth" | "dare" | null>(null);
  const [prompt, setPrompt] = useState("");
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  const pick = useCallback(
    (type: "truth" | "dare") => {
      const list = type === "truth" ? TRUTHS : DARES;
      const available = list
        .map((_, i) => i)
        .filter((i) => !usedIndices.includes(i));
      const pool = available.length > 0 ? available : list.map((_, i) => i);
      const idx = pool[Math.floor(Math.random() * pool.length)];
      setMode(type);
      setPrompt(list[idx]);
      setUsedIndices((prev) => [...prev.filter((i) => i !== idx), idx]);
    },
    [usedIndices],
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-3 justify-center">
        <Button
          onClick={() => pick("truth")}
          className={`px-6 h-10 rounded-full font-semibold transition-all ${
            mode === "truth"
              ? "bg-violet-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          }`}
          data-ocid="tod.truth_button"
        >
          💬 Truth
        </Button>
        <Button
          onClick={() => pick("dare")}
          className={`px-6 h-10 rounded-full font-semibold transition-all ${
            mode === "dare"
              ? "bg-pink-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          }`}
          data-ocid="tod.dare_button"
        >
          🔥 Dare
        </Button>
      </div>
      {prompt && (
        <motion.div
          key={prompt}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-5 text-center"
        >
          <Badge
            className={`mb-3 ${
              mode === "truth"
                ? "bg-violet-500/30 text-violet-200 border-violet-400/30"
                : "bg-pink-500/30 text-pink-200 border-pink-400/30"
            }`}
          >
            {mode === "truth" ? "Truth" : "Dare"}
          </Badge>
          <p className="text-white text-base leading-relaxed font-medium">
            {prompt}
          </p>
          <Button
            onClick={() => pick(mode!)}
            variant="ghost"
            className="mt-4 text-white/60 hover:text-white text-sm"
            data-ocid="tod.secondary_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Next
          </Button>
        </motion.div>
      )}
      {!prompt && (
        <p className="text-center text-white/40 text-sm">
          Tap Truth or Dare to begin!
        </p>
      )}
    </div>
  );
}

// ── Would You Rather ─────────────────────────────────────────
const WYR_PAIRS = [
  ["Have the ability to fly", "Be invisible whenever you want"],
  ["Live in space", "Live underwater"],
  ["Know every language", "Play every instrument"],
  ["Never sleep again", "Never eat again"],
  ["Be famous but hated", "Be unknown but loved"],
  ["Have a rewind button", "Have a pause button for life"],
  ["Lose all your memories", "Never make new ones"],
  ["Always be 10 minutes late", "Always be 20 minutes early"],
  ["Be able to talk to animals", "Read minds"],
  ["Have no internet for a year", "Have no music for a year"],
  ["Live in 1920s", "Live in 2120s"],
  ["Be the funniest person in the room", "Be the smartest person in the room"],
];
const WYR_REACTIONS = [
  "Bold choice!",
  "Interesting...",
  "Respect.",
  "Classic!",
  "Risky move!",
  "The dream!",
  "Living dangerously!",
  "Solid pick.",
];

function WouldYouRather() {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<0 | 1 | null>(null);
  const [reaction, setReaction] = useState("");

  const pair = WYR_PAIRS[idx];

  const choose = (side: 0 | 1) => {
    setChosen(side);
    setReaction(
      WYR_REACTIONS[Math.floor(Math.random() * WYR_REACTIONS.length)],
    );
  };

  const next = () => {
    setIdx((i) => (i + 1) % WYR_PAIRS.length);
    setChosen(null);
    setReaction("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-stretch gap-3">
        {([0, 1] as const).map((side) => (
          <button
            key={side}
            type="button"
            onClick={() => choose(side)}
            disabled={chosen !== null}
            className={`flex-1 rounded-2xl p-4 text-center text-sm font-semibold transition-all leading-relaxed ${
              chosen === side
                ? "bg-accent text-accent-foreground scale-[1.02]"
                : chosen !== null
                  ? "bg-white/05 text-white/30"
                  : "bg-white/10 text-white hover:bg-white/20 hover:scale-[1.01]"
            }`}
            data-ocid={
              side === 0 ? "wyr.primary_button" : "wyr.secondary_button"
            }
          >
            {pair[side]}
          </button>
        ))}
      </div>
      {chosen !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-accent font-bold text-lg">{reaction}</p>
          <Button
            onClick={next}
            className="mt-3 bg-white/10 text-white hover:bg-white/20 rounded-full px-5 h-8 text-sm"
            data-ocid="wyr.primary_button"
          >
            Next Question →
          </Button>
        </motion.div>
      )}
      <p className="text-center text-white/30 text-xs">
        Question {idx + 1} of {WYR_PAIRS.length}
      </p>
    </div>
  );
}

// ── Tic-Tac-Toe ──────────────────────────────────────────────
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TTT_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function checkWin(board: ("X" | "O" | null)[]): {
  winner: "X" | "O" | null;
  line: number[] | null;
} {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as "X" | "O", line };
    }
  }
  return { winner: null, line: null };
}

function TicTacToe() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const { winner, line } = checkWin(board);
  const isDraw = !winner && board.every(Boolean);

  const click = (i: number) => {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);
    setTurn((t) => (t === "X" ? "O" : "X"));
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm font-semibold text-white/70">
        {winner ? (
          <span className="text-accent text-base">
            🏆 Player {winner} wins!
          </span>
        ) : isDraw ? (
          <span className="text-white/60">It&apos;s a draw!</span>
        ) : (
          <span>
            Player{" "}
            <span className={turn === "X" ? "text-violet-400" : "text-white"}>
              {turn}
            </span>{" "}
            &apos;s turn
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {TTT_POSITIONS.map((pos) => (
          <button
            key={pos}
            type="button"
            onClick={() => click(pos)}
            className={`w-16 h-16 rounded-xl text-2xl font-bold transition-all flex items-center justify-center ${
              line?.includes(pos)
                ? "bg-accent/30 border-2 border-accent"
                : "bg-white/08 hover:bg-white/15 border border-white/10"
            } ${board[pos] === "X" ? "text-violet-400" : "text-white"}`}
            data-ocid={`ttt.item.${pos + 1}`}
          >
            {board[pos]}
          </button>
        ))}
      </div>
      <Button
        onClick={restart}
        className="bg-white/10 text-white hover:bg-white/20 rounded-full px-5 h-8 text-sm"
        data-ocid="ttt.primary_button"
      >
        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
        Restart
      </Button>
    </div>
  );
}

// ── Hand Cricket ─────────────────────────────────────────────
function HandCricket() {
  const WICKETS_PER_INNINGS = 3;

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [innings, setInnings] = useState<1 | 2>(1);
  const [wickets, setWickets] = useState(0);
  const [lastResult, setLastResult] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [target, setTarget] = useState<number | null>(null);

  const playBall = (playerNum: number) => {
    if (gameOver) return;
    const compNum = Math.ceil(Math.random() * 6);
    if (playerNum === compNum) {
      const newWickets = wickets + 1;
      setWickets(newWickets);
      setLastResult(
        `Both chose ${playerNum} — OUT! 🏏 (${newWickets}/${WICKETS_PER_INNINGS} wickets)`,
      );
      if (newWickets >= WICKETS_PER_INNINGS) {
        if (innings === 1) {
          setInnings(2);
          setTarget(playerScore);
          setWickets(0);
          setLastResult(
            `All out! Your score: ${playerScore}. Computer needs ${playerScore + 1} to win.`,
          );
        } else {
          setGameOver(true);
          if (computerScore > playerScore) {
            setWinner("Computer wins! 🤖");
          } else if (computerScore < playerScore) {
            setWinner("You win! 🎉");
          } else {
            setWinner("It's a tie!");
          }
        }
      }
    } else {
      if (innings === 1) {
        const newScore = playerScore + playerNum;
        setPlayerScore(newScore);
        setLastResult(
          `You: ${playerNum}, Computer: ${compNum} → +${playerNum} runs`,
        );
        if (target !== null && newScore > target) {
          setGameOver(true);
          setWinner("You win! 🎉");
        }
      } else {
        const newScore = computerScore + compNum;
        setComputerScore(newScore);
        setLastResult(
          `You bowled: ${playerNum}, Computer: ${compNum} → +${compNum} runs`,
        );
        if (target !== null && newScore > target) {
          setGameOver(true);
          setWinner("Computer wins! 🤖");
        }
      }
    }
  };

  const reset = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setInnings(1);
    setWickets(0);
    setLastResult("");
    setGameOver(false);
    setWinner("");
    setTarget(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div
          className={`glass-card rounded-xl p-3 text-center ${
            innings === 1 ? "border border-accent/40" : ""
          }`}
        >
          <p className="text-white/50 text-xs">
            You {innings === 1 ? "🏏" : "🎯"}
          </p>
          <p className="text-2xl font-bold text-white">{playerScore}</p>
        </div>
        <div
          className={`glass-card rounded-xl p-3 text-center ${
            innings === 2 ? "border border-accent/40" : ""
          }`}
        >
          <p className="text-white/50 text-xs">
            Computer {innings === 2 ? "🏏" : "🎯"}
          </p>
          <p className="text-2xl font-bold text-white">{computerScore}</p>
        </div>
      </div>
      {target !== null && (
        <p className="text-center text-xs text-white/50">
          Target:{" "}
          <span className="text-accent font-semibold">{target + 1}</span>
        </p>
      )}
      <p className="text-center text-xs text-white/40">
        Wickets: {wickets}/{WICKETS_PER_INNINGS}
      </p>
      {lastResult && (
        <motion.p
          key={lastResult}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-white/70 glass-card rounded-xl px-3 py-2"
        >
          {lastResult}
        </motion.p>
      )}
      {gameOver ? (
        <div className="text-center space-y-3">
          <p className="text-xl font-bold text-accent">{winner}</p>
          <Button
            onClick={reset}
            className="bg-accent text-accent-foreground rounded-full px-6 h-9"
            data-ocid="cricket.primary_button"
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-center text-xs text-white/50">
            {innings === 1
              ? "You are batting. Pick a number:"
              : "You are bowling. Pick a number:"}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => playBall(n)}
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-accent/40 text-white font-bold text-lg transition-all hover:scale-105"
                data-ocid={`cricket.item.${n}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Ludo (simplified) ────────────────────────────────────────
function Ludo() {
  const MAX = 50;
  const [bluePos, setBluePos] = useState(0);
  const [redPos, setRedPos] = useState(0);
  const [turn, setTurn] = useState<"blue" | "red">("blue");
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const roll = () => {
    if (winner) return;
    const dice = Math.ceil(Math.random() * 6);
    setLastRoll(dice);
    if (turn === "blue") {
      const newPos = Math.min(bluePos + dice, MAX);
      setBluePos(newPos);
      if (newPos >= MAX) {
        setWinner("🔵 Blue wins!");
        return;
      }
      setTurn("red");
    } else {
      const newPos = Math.min(redPos + dice, MAX);
      setRedPos(newPos);
      if (newPos >= MAX) {
        setWinner("🔴 Red wins!");
        return;
      }
      setTurn("blue");
    }
  };

  const reset = () => {
    setBluePos(0);
    setRedPos(0);
    setTurn("blue");
    setLastRoll(null);
    setWinner(null);
  };

  const blueProgress = Math.round((bluePos / MAX) * 100);
  const redProgress = Math.round((redPos / MAX) * 100);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-blue-300 font-semibold">
              🔵 Blue — {bluePos}/{MAX}
            </span>
            <span className="text-white/40">{blueProgress}%</span>
          </div>
          <div className="w-full bg-white/08 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              animate={{ width: `${blueProgress}%` }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-red-300 font-semibold">
              🔴 Red — {redPos}/{MAX}
            </span>
            <span className="text-white/40">{redProgress}%</span>
          </div>
          <div className="w-full bg-white/08 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-red-500 rounded-full"
              animate={{ width: `${redProgress}%` }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </div>
        </div>
      </div>

      {lastRoll !== null && (
        <motion.div
          key={`${turn}-${lastRoll}`}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <span className="text-4xl">🎲</span>
          <p className="text-white/70 text-sm mt-1">
            Rolled: <span className="text-white font-bold">{lastRoll}</span>
          </p>
        </motion.div>
      )}

      {winner ? (
        <div className="text-center space-y-3">
          <p className="text-xl font-bold text-accent">{winner}</p>
          <Button
            onClick={reset}
            className="bg-accent text-accent-foreground rounded-full px-6 h-9"
            data-ocid="ludo.primary_button"
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <p className="text-sm text-white/60">
            <span
              className={
                turn === "blue"
                  ? "text-blue-300 font-semibold"
                  : "text-red-300 font-semibold"
              }
            >
              {turn === "blue" ? "🔵 Blue" : "🔴 Red"}&apos;s turn
            </span>
          </p>
          <Button
            onClick={roll}
            className="bg-accent text-accent-foreground rounded-full px-8 h-10 font-semibold"
            data-ocid="ludo.primary_button"
          >
            <Dices className="w-4 h-4 mr-2" />
            Roll Dice
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Car Racing ────────────────────────────────────────────────
const CAR_BEST_KEY = "lunara_arcadia_car_best";
const CANVAS_W = 320;
const CANVAS_H = 480;
const ROAD_LEFT = 40;
const ROAD_RIGHT = CANVAS_W - 40;
const ROAD_W = ROAD_RIGHT - ROAD_LEFT;
const LANE_COUNT = 3;
const LANE_W = ROAD_W / LANE_COUNT;
const PLAYER_W = 36;
const PLAYER_H = 56;
const OPPONENT_W = 36;
const OPPONENT_H = 56;
const OPPONENT_COLORS = ["#ef4444", "#f97316", "#eab308", "#22d3ee", "#ec4899"];

type Phase = "start" | "playing" | "over";

interface OpponentCar {
  x: number;
  y: number;
  speed: number;
  color: string;
  lane: number;
}

function CarRacing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<Phase>("start");
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const keysRef = useRef<Record<string, boolean>>({});

  // Mutable game state in refs to avoid re-render overhead
  const playerXRef = useRef(ROAD_LEFT + LANE_W + (LANE_W - PLAYER_W) / 2);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const speedRef = useRef(180); // px/sec base road scroll speed
  const opponentsRef = useRef<OpponentCar[]>([]);
  const laneOffsetRef = useRef(0); // for dashed line animation
  const spawnTimerRef = useRef(0);
  const bestRef = useRef(
    Number.parseInt(localStorage.getItem(CAR_BEST_KEY) ?? "0", 10),
  );
  const flashRef = useRef(0); // invincibility flash frames after hit

  // React state only for overlay rendering
  const [phase, setPhase] = useState<Phase>("start");
  const [finalScore, setFinalScore] = useState(0);
  const [finalBest, setFinalBest] = useState(bestRef.current);

  const startGame = useCallback(() => {
    playerXRef.current = ROAD_LEFT + LANE_W + (LANE_W - PLAYER_W) / 2;
    scoreRef.current = 0;
    livesRef.current = 3;
    speedRef.current = 180;
    opponentsRef.current = [];
    laneOffsetRef.current = 0;
    spawnTimerRef.current = 0;
    flashRef.current = 0;
    phaseRef.current = "playing";
    setPhase("playing");
    lastTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Draw helpers ──
    const drawRoad = () => {
      // Grass sides
      ctx.fillStyle = "#1a2e1a";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Road surface
      ctx.fillStyle = "#1c1c2e";
      ctx.fillRect(ROAD_LEFT, 0, ROAD_W, CANVAS_H);

      // Road edges
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ROAD_LEFT, 0);
      ctx.lineTo(ROAD_LEFT, CANVAS_H);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ROAD_RIGHT, 0);
      ctx.lineTo(ROAD_RIGHT, CANVAS_H);
      ctx.stroke();

      // Dashed lane lines
      const dashLen = 30;
      const gapLen = 20;
      const period = dashLen + gapLen;
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([dashLen, gapLen]);
      for (let lane = 1; lane < LANE_COUNT; lane++) {
        const lx = ROAD_LEFT + lane * LANE_W;
        ctx.lineDashOffset = -(laneOffsetRef.current % period);
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, CANVAS_H);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    };

    const drawCar = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: string,
      isPlayer: boolean,
    ) => {
      const r = 6;
      // Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();

      // Windshield
      ctx.fillStyle = isPlayer ? "rgba(180,140,255,0.5)" : "rgba(0,0,0,0.4)";
      const wsx = x + w * 0.15;
      const wsw = w * 0.7;
      if (isPlayer) {
        ctx.beginPath();
        ctx.roundRect(wsx, y + h * 0.08, wsw, h * 0.22, 3);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.roundRect(wsx, y + h * 0.1, wsw, h * 0.2, 3);
        ctx.fill();
      }

      // Wheels
      ctx.fillStyle = "#111";
      const wheelW = 8;
      const wheelH = 14;
      // front-left
      ctx.beginPath();
      ctx.roundRect(x - wheelW + 2, y + h * 0.1, wheelW, wheelH, 2);
      ctx.fill();
      // front-right
      ctx.beginPath();
      ctx.roundRect(x + w - 2, y + h * 0.1, wheelW, wheelH, 2);
      ctx.fill();
      // rear-left
      ctx.beginPath();
      ctx.roundRect(x - wheelW + 2, y + h * 0.72, wheelW, wheelH, 2);
      ctx.fill();
      // rear-right
      ctx.beginPath();
      ctx.roundRect(x + w - 2, y + h * 0.72, wheelW, wheelH, 2);
      ctx.fill();

      if (isPlayer) {
        // Glow effect
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 12;
        ctx.strokeStyle = "rgba(168,85,247,0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    const drawHUD = () => {
      // Score
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.beginPath();
      ctx.roundRect(8, 8, 120, 36, 8);
      ctx.fill();
      ctx.fillStyle = "#e2d9f3";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(`Score: ${Math.floor(scoreRef.current)}`, 16, 31);

      // Lives
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.beginPath();
      ctx.roundRect(CANVAS_W - 100, 8, 92, 36, 8);
      ctx.fill();
      ctx.fillStyle = "#f87171";
      ctx.font = "bold 13px sans-serif";
      const hearts = "❤️".repeat(livesRef.current);
      ctx.fillText(hearts, CANVAS_W - 94, 31);

      // Speed
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.beginPath();
      ctx.roundRect(CANVAS_W / 2 - 45, 8, 90, 36, 8);
      ctx.fill();
      ctx.fillStyle = "#a78bfa";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        `${Math.floor(speedRef.current / 10)} km/h`,
        CANVAS_W / 2,
        31,
      );
      ctx.textAlign = "left";
    };

    // ── Spawn helper ──
    const spawnOpponent = () => {
      const lane = Math.floor(Math.random() * LANE_COUNT);
      const x = ROAD_LEFT + lane * LANE_W + (LANE_W - OPPONENT_W) / 2;
      const color =
        OPPONENT_COLORS[Math.floor(Math.random() * OPPONENT_COLORS.length)];
      const speed = speedRef.current * (0.5 + Math.random() * 0.6);
      opponentsRef.current.push({ x, y: -OPPONENT_H - 10, speed, color, lane });
    };

    // ── Game loop ──
    const loop = (now: number) => {
      if (phaseRef.current !== "playing") return;

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      // Score + speed ramp
      scoreRef.current += dt * (speedRef.current / 10);
      speedRef.current = 180 + Math.floor(scoreRef.current / 200) * 20;

      // Lane offset for scrolling dashes
      laneOffsetRef.current += speedRef.current * dt;

      // Player movement
      const moveSpeed = 280;
      const pxLeft = ROAD_LEFT + 4;
      const pxRight = ROAD_RIGHT - PLAYER_W - 4;
      if (keysRef.current.ArrowLeft || keysRef.current.a) {
        playerXRef.current = Math.max(
          pxLeft,
          playerXRef.current - moveSpeed * dt,
        );
      }
      if (keysRef.current.ArrowRight || keysRef.current.d) {
        playerXRef.current = Math.min(
          pxRight,
          playerXRef.current + moveSpeed * dt,
        );
      }

      // Spawn opponents
      spawnTimerRef.current += dt;
      const spawnInterval = Math.max(0.6, 1.6 - scoreRef.current / 800);
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        spawnOpponent();
      }

      // Move opponents
      const playerY = CANVAS_H - PLAYER_H - 20;
      opponentsRef.current = opponentsRef.current.filter((op) => {
        op.y += (speedRef.current + op.speed) * dt;

        // Collision check (skip if flashing)
        if (flashRef.current <= 0) {
          const margin = 6;
          const px = playerXRef.current;
          const py = playerY;
          if (
            px < op.x + OPPONENT_W - margin &&
            px + PLAYER_W > op.x + margin &&
            py < op.y + OPPONENT_H - margin &&
            py + PLAYER_H > op.y + margin
          ) {
            livesRef.current -= 1;
            flashRef.current = 90; // ~1.5s of flashing
            if (livesRef.current <= 0) {
              phaseRef.current = "over";
              const sc = Math.floor(scoreRef.current);
              const best = bestRef.current;
              const newBest = Math.max(sc, best);
              bestRef.current = newBest;
              localStorage.setItem(CAR_BEST_KEY, String(newBest));
              setFinalScore(sc);
              setFinalBest(newBest);
              setPhase("over");
              return false;
            }
            return false; // remove the car that hit
          }
        } else {
          flashRef.current -= 1;
        }

        return op.y < CANVAS_H + OPPONENT_H;
      });

      if (phaseRef.current !== "playing") return;

      // ── Draw ──
      drawRoad();

      // Opponents
      for (const op of opponentsRef.current) {
        drawCar(op.x, op.y, OPPONENT_W, OPPONENT_H, op.color, false);
      }

      // Player (flash when hit)
      const shouldDraw =
        flashRef.current <= 0 || Math.floor(flashRef.current / 8) % 2 === 0;
      if (shouldDraw) {
        drawCar(
          playerXRef.current,
          playerY,
          PLAYER_W,
          PLAYER_H,
          "#a855f7",
          true,
        );
      }

      drawHUD();

      rafRef.current = requestAnimationFrame(loop);
    };

    // ── Start screen draw ──
    const drawStartScreen = () => {
      ctx.fillStyle = "#0a001a";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = "#1c1c2e";
      ctx.fillRect(ROAD_LEFT, 0, ROAD_W, CANVAS_H);
      // Simple lane lines
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 2;
      ctx.setLineDash([30, 20]);
      for (let lane = 1; lane < LANE_COUNT; lane++) {
        const lx = ROAD_LEFT + lane * LANE_W;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, CANVAS_H);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      // Title
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.beginPath();
      ctx.roundRect(CANVAS_W / 2 - 110, CANVAS_H / 2 - 80, 220, 140, 16);
      ctx.fill();
      ctx.textAlign = "center";
      ctx.fillStyle = "#a855f7";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("🏎️ Car Racing", CANVAS_W / 2, CANVAS_H / 2 - 44);
      ctx.fillStyle = "#e2d9f3";
      ctx.font = "14px sans-serif";
      ctx.fillText("Dodge the traffic!", CANVAS_W / 2, CANVAS_H / 2 - 16);
      ctx.fillStyle = "#a78bfa";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText(
        "Press Space or Tap to Start",
        CANVAS_W / 2,
        CANVAS_H / 2 + 20,
      );
      if (bestRef.current > 0) {
        ctx.fillStyle = "#fcd34d";
        ctx.font = "12px sans-serif";
        ctx.fillText(
          `Best: ${bestRef.current}`,
          CANVAS_W / 2,
          CANVAS_H / 2 + 46,
        );
      }
      ctx.textAlign = "left";
    };

    drawStartScreen();

    // ── Event listeners ──
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === " ") {
        e.preventDefault();
        if (phaseRef.current === "start" || phaseRef.current === "over") {
          startGame();
          rafRef.current = requestAnimationFrame(loop);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    const onCanvasClick = (e: MouseEvent) => {
      if (phaseRef.current === "start" || phaseRef.current === "over") {
        startGame();
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (phaseRef.current === "playing") {
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const mid = rect.width / 2;
        if (cx < mid) {
          // Simulate a brief left press
          keysRef.current.ArrowLeft = true;
          setTimeout(() => {
            keysRef.current.ArrowLeft = false;
          }, 120);
        } else {
          keysRef.current.ArrowRight = true;
          setTimeout(() => {
            keysRef.current.ArrowRight = false;
          }, 120);
        }
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (phaseRef.current === "start" || phaseRef.current === "over") {
        startGame();
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (phaseRef.current === "playing" && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const cx = e.touches[0].clientX - rect.left;
        const mid = rect.width / 2;
        if (cx < mid) {
          keysRef.current.ArrowLeft = true;
          setTimeout(() => {
            keysRef.current.ArrowLeft = false;
          }, 120);
        } else {
          keysRef.current.ArrowRight = true;
          setTimeout(() => {
            keysRef.current.ArrowRight = false;
          }, 120);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("touchstart", onTouchStart);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("click", onCanvasClick);
      canvas.removeEventListener("touchstart", onTouchStart);
    };
  }, [startGame]);

  // Restart handler for overlay button
  const handleRestart = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="rounded-2xl cursor-pointer select-none"
          style={{ touchAction: "none" }}
          data-ocid="racing.canvas_target"
        />
        {/* Game Over overlay */}
        {phase === "over" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
            style={{ background: "rgba(5,0,20,0.82)" }}
            data-ocid="racing.modal"
          >
            <p className="text-4xl mb-2">💥</p>
            <p className="text-white font-bold text-2xl mb-1">Game Over</p>
            <p className="text-white/60 text-sm mb-1">
              Score:{" "}
              <span className="text-accent font-bold text-base">
                {finalScore}
              </span>
            </p>
            <p className="text-yellow-400 text-sm mb-5">🏆 Best: {finalBest}</p>
            <Button
              onClick={handleRestart}
              className="bg-accent text-accent-foreground rounded-full px-8 h-10 font-semibold hover:bg-accent/90"
              data-ocid="racing.primary_button"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        )}
      </div>
      <p className="text-white/40 text-xs text-center">
        ← → Arrow keys or A / D to steer &nbsp;·&nbsp; Tap left/right side to
        steer on mobile
      </p>
    </div>
  );
}

// ── Game configs ─────────────────────────────────────────────
const GAMES = [
  {
    id: "truth-or-dare",
    title: "Truth or Dare",
    description:
      "Choose your fate — reveal a deep truth or accept a wild dare.",
    emoji: "💬",
    component: TruthOrDare,
  },
  {
    id: "would-you-rather",
    title: "Would You Rather",
    description: "Two options. No wrong answer. Endless debate.",
    emoji: "🤔",
    component: WouldYouRather,
  },
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Classic 3×3 battle. X vs O. Who claims the grid?",
    emoji: "⭕",
    component: TicTacToe,
  },
  {
    id: "hand-cricket",
    title: "Hand Cricket",
    description: "Bat, bowl, and bluff. A numbers game of timing and instinct.",
    emoji: "🏏",
    component: HandCricket,
  },
  {
    id: "ludo",
    title: "Ludo",
    description:
      "Roll the dice and race to 50. Blue vs Red — first to finish wins!",
    emoji: "🎲",
    component: Ludo,
  },
  {
    id: "car-racing",
    title: "Car Racing",
    description:
      "Dodge traffic on the lunar highway. How long can you survive?",
    emoji: "🏎️",
    component: CarRacing,
  },
];

// ── Leaderboard ───────────────────────────────────────────────
const GLOBAL_ARCADE_DATA = [
  { rank: 1, username: "LunarLegend", topGame: "Ludo", seconds: 72000 },
  { rank: 2, username: "NightRacer", topGame: "Car Racing", seconds: 64800 },
  { rank: 3, username: "CricketAce", topGame: "Hand Cricket", seconds: 57600 },
  {
    rank: 4,
    username: "DareDevil99",
    topGame: "Truth or Dare",
    seconds: 50400,
  },
  { rank: 5, username: "GridMaster", topGame: "Tic-Tac-Toe", seconds: 43200 },
  { rank: 6, username: "SurferX", topGame: "Would You Rather", seconds: 36000 },
];

function Leaderboard({
  playtime,
  onReset,
  activeGame,
  sessionStart,
}: {
  playtime: Record<string, number>;
  onReset: () => void;
  activeGame: string | null;
  sessionStart: number | null;
}) {
  const [lbTab, setLbTab] = useState<"global" | "personal">("global");
  const [tick, setTick] = useState(0);

  // Tick every second when a game is active
  useEffect(() => {
    if (!activeGame) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [activeGame]);

  const getLiveSeconds = (gameId: string): number => {
    const stored = playtime[gameId] ?? 0;
    if (activeGame === gameId && sessionStart !== null) {
      return stored + Math.floor((Date.now() - sessionStart) / 1000);
    }
    return stored;
  };

  const ranked = [...GAMES]
    .map((g) => ({ ...g, seconds: getLiveSeconds(g.id) }))
    .sort((a, b) => b.seconds - a.seconds);

  // suppress tick warning
  void tick;

  const topSeconds = ranked[0]?.seconds ?? 0;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Playtime Leaderboard
              </h2>
              <p className="text-white/40 text-sm mt-0.5">
                Top players by total playtime
              </p>
            </div>
          </div>
          <Button
            onClick={onReset}
            variant="ghost"
            className="text-white/40 hover:text-white/70 hover:bg-white/08 text-xs flex items-center gap-1.5 h-8 px-3 rounded-full"
            data-ocid="leaderboard.delete_button"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["global", "personal"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setLbTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                lbTab === t
                  ? "bg-accent text-accent-foreground"
                  : "glass-card border border-white/10 text-white/60 hover:text-white"
              }`}
              data-ocid="leaderboard.tab"
            >
              {t === "global" ? "🌍 Global" : "👤 Personal"}
            </button>
          ))}
        </div>

        {lbTab === "personal" ? (
          <div className="space-y-3" data-ocid="leaderboard.list">
            {ranked.map((game, i) => {
              const pct =
                topSeconds > 0
                  ? Math.round((game.seconds / topSeconds) * 100)
                  : 0;
              const medal = RANK_MEDALS[i] ?? null;
              const rankLabel =
                i === 0
                  ? "1st"
                  : i === 1
                    ? "2nd"
                    : i === 2
                      ? "3rd"
                      : `${i + 1}th`;
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`glass-card rounded-2xl border p-4 flex items-center gap-4 ${
                    i === 0 && game.seconds > 0
                      ? "border-accent/40"
                      : "border-white/08"
                  }`}
                  data-ocid={`leaderboard.item.${i + 1}`}
                >
                  <div className="w-12 shrink-0 text-center">
                    {medal ? (
                      <span className="text-2xl">{medal}</span>
                    ) : (
                      <span className="text-white/30 font-bold text-base">
                        {rankLabel}
                      </span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/08 flex items-center justify-center text-xl shrink-0">
                    {game.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">
                      {game.title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Progress
                        value={pct}
                        className="h-1.5 flex-1 bg-white/08"
                      />
                      {activeGame === game.id ? (
                        <span className="text-xs text-green-400 shrink-0 w-28 text-right flex items-center gap-1 justify-end">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                          {formatMMSS(game.seconds)} playing
                        </span>
                      ) : (
                        <span className="text-xs text-white/50 shrink-0 w-16 text-right">
                          {game.seconds > 0 ? formatMMSS(game.seconds) : "—"}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {topSeconds === 0 && (
              <p
                className="text-center text-white/30 text-sm mt-6"
                data-ocid="leaderboard.empty_state"
              >
                Start playing to see your stats here!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {GLOBAL_ARCADE_DATA.map((player, i) => {
              const maxG = GLOBAL_ARCADE_DATA[0]?.seconds || 1;
              const pct = Math.round((player.seconds / maxG) * 100);
              const medal = RANK_MEDALS[i] ?? null;
              const rankLabel =
                i === 0
                  ? "1st"
                  : i === 1
                    ? "2nd"
                    : i === 2
                      ? "3rd"
                      : `${i + 1}th`;
              return (
                <motion.div
                  key={player.username}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`glass-card rounded-2xl border p-4 flex items-center gap-4 ${
                    i === 0 ? "border-accent/40" : "border-white/08"
                  }`}
                  data-ocid={`leaderboard.item.${i + 1}`}
                >
                  <div className="w-12 shrink-0 text-center">
                    {medal ? (
                      <span className="text-2xl">{medal}</span>
                    ) : (
                      <span className="text-white/30 font-bold text-base">
                        {rankLabel}
                      </span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                    {player.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-white text-sm">
                        {player.username}
                      </p>
                      <span className="text-accent text-xs font-mono shrink-0">
                        {formatTime(player.seconds)}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs mb-1.5">
                      Top game: {player.topGame}
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={pct}
                        className="h-1.5 flex-1 bg-white/08"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────

// -- Roast Battle -------------------------------------------------
type RoastMessage = { user: string; text: string; side: "left" | "right" };

const INITIAL_ROASTS: RoastMessage[] = [
  {
    user: "FlameKing99",
    text: "You code like your keyboard is missing the spacebar.",
    side: "left",
  },
  {
    user: "BurnUnit",
    text: "At least my keyboard has keys. Unlike your skills.",
    side: "right",
  },
  {
    user: "FlameKing99",
    text: "I've seen better arguments in a syntax error log.",
    side: "left",
  },
  {
    user: "BurnUnit",
    text: "Bro your commit messages are just the word 'fix' 47 times.",
    side: "right",
  },
];

function RoastBattle() {
  const [roasts, setRoasts] = useState<RoastMessage[]>(INITIAL_ROASTS);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fire = () => {
    const text = input.trim();
    if (!text) return;
    setRoasts((prev) => [...prev, { user: "You", text, side: "right" }]);
    setInput("");
    setTimeout(() => {
      if (containerRef.current)
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 50);
  };

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="space-y-3 max-h-72 overflow-y-auto pr-1"
      >
        {roasts.map((r, i) => (
          <div
            key={`${r.user}-${i}`}
            className={`flex gap-2 ${r.side === "right" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                r.side === "left"
                  ? "bg-orange-500/30 text-orange-300"
                  : "bg-amber-500/30 text-amber-300"
              }`}
            >
              {r.side === "left" ? "L" : "R"}
            </div>
            <div className="max-w-xs">
              <p
                className={`text-xs mb-1 text-white/40 ${
                  r.side === "right" ? "text-right" : ""
                }`}
              >
                {r.user}
              </p>
              <div
                className={`px-3 py-2 rounded-xl text-sm font-medium ${
                  r.side === "left"
                    ? "bg-orange-500/20 text-orange-200 border border-orange-500/20"
                    : "bg-amber-500/20 text-amber-200 border border-amber-500/20"
                }`}
              >
                {r.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <p className="text-xs text-white/30 text-center italic">
        Keep it fun. No hate speech or personal attacks.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fire()}
          placeholder="Write your roast..."
          className="flex-1 bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-orange-500/20 outline-none focus:border-orange-500/50"
          data-ocid="roastbattle.input"
        />
        <Button
          onClick={fire}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 rounded-xl px-4 font-semibold"
          data-ocid="roastbattle.submit_button"
        >
          <Flame className="w-4 h-4 mr-1" /> Fire It
        </Button>
      </div>
    </div>
  );
}

export default function LunarArcadia() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [playtime, setPlaytime] = useState<Record<string, number>>(() =>
    loadPlaytime(),
  );

  // Track session start time for the currently open game
  const sessionStartRef = useRef<number | null>(null);
  const activeGameRef = useRef<string | null>(null);

  // Flush elapsed time for the active game into playtime state + localStorage
  const flushTime = useCallback((gameId: string) => {
    if (sessionStartRef.current === null) return;
    const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000);
    sessionStartRef.current = null;
    if (elapsed <= 0) return;
    setPlaytime((prev) => {
      const updated = { ...prev, [gameId]: (prev[gameId] ?? 0) + elapsed };
      savePlaytime(updated);
      return updated;
    });
  }, []);

  const toggleGame = (id: string) => {
    setActiveGame((prev) => {
      const closing = prev === id ? null : id;

      // Stop timer for previously open game
      if (prev !== null) {
        flushTime(prev);
      }

      // Start timer for newly opened game
      if (closing !== null) {
        sessionStartRef.current = Date.now();
      }

      activeGameRef.current = closing;
      return closing;
    });
  };

  // Flush on unmount
  useEffect(() => {
    return () => {
      if (activeGameRef.current !== null && sessionStartRef.current !== null) {
        flushTime(activeGameRef.current);
      }
    };
  }, [flushTime]);

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPlaytime({});
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-[60vh] flex items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0A001A 0%, #1A0035 40%, #350060 70%, #1A0050 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-10 right-16 w-72 h-72 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Arcade Zone
              </Badge>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
              Lunar Arcadia
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Six games. Infinite fun. No downloads, no installs — just pure
              in-browser play with your crew.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                className="bg-accent text-accent-foreground font-semibold px-6 h-11 rounded-full hover:bg-accent/90"
                onClick={() =>
                  document
                    .getElementById("games")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="arcadia.primary_button"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Now
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("leaderboard")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="arcadia.secondary_button"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section id="games" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Game Library
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Click any game to play right here, right now
              </p>
            </div>
            <Badge className="bg-accent/20 text-accent border-accent/30">
              <Swords className="w-3 h-3 mr-1" />6 Games
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GAMES.map((game, gi) => {
              const isActive = activeGame === game.id;
              const GameComponent = game.component;

              return (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.08 }}
                  className={`glass-card rounded-3xl border border-white/10 overflow-hidden transition-colors ${
                    isActive ? "border-accent/30" : "hover:border-white/20"
                  }`}
                  data-ocid={`arcadia.item.${gi + 1}`}
                >
                  {/* Card header */}
                  <button
                    type="button"
                    className="w-full p-6 flex items-center gap-4 text-left"
                    onClick={() => toggleGame(game.id)}
                    data-ocid="arcadia.toggle"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-all ${
                        isActive
                          ? "bg-accent/30 scale-110"
                          : "bg-white/08 group-hover:bg-white/15"
                      }`}
                    >
                      {game.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg flex items-center gap-2">
                        {game.title}
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                        )}
                      </h3>
                      <p className="text-white/50 text-sm mt-0.5">
                        {game.description}
                      </p>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? "bg-accent text-accent-foreground rotate-45"
                          : "bg-white/08 text-white/50 hover:bg-white/15"
                      }`}
                    >
                      <span className="text-lg font-light leading-none">
                        {isActive ? "×" : "+"}
                      </span>
                    </div>
                  </button>

                  {/* Expandable game UI */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="border-t border-white/08 px-6 py-6"
                          style={{ background: "rgba(10,0,30,0.6)" }}
                        >
                          <GameComponent />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roast Battle Section */}
      <section id="roast-battle" className="py-16 glass-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl border border-orange-500/20 overflow-hidden"
            data-ocid="roastbattle.panel"
          >
            <div
              className="px-6 py-5 border-b border-orange-500/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(245,158,11,0.15))",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Roast Battle</h2>
                  <p className="text-white/50 text-sm">
                    Friendly fire only. Keep it playful, keep it fun.
                  </p>
                </div>
                <Badge className="ml-auto bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Swords className="w-3 h-3 mr-1" /> Arena
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <RoastBattle />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Playtime Leaderboard */}
      <div id="leaderboard">
        <Leaderboard
          playtime={playtime}
          onReset={handleReset}
          activeGame={activeGame}
          sessionStart={sessionStartRef.current}
        />
      </div>

      {/* CTA */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(160deg, #0A001A 0%, #1A0035 50%, #350060 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Gamepad2 className="w-12 h-12 text-white mx-auto mb-4 opacity-70" />
          <h2 className="text-3xl font-bold text-white mb-4">
            More Games Coming Soon
          </h2>
          <p className="text-white/60 mb-8">
            The Arcadia is growing. Got a game idea? Suggest it to the Lunara
            team — your idea could be next.
          </p>
          <a
            href="mailto:katariavianyt45@gmail.com?subject=Game%20Idea%20for%20Lunar%20Arcadia"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-full hover:bg-accent/90 transition-colors"
            data-ocid="arcadia.primary_button"
          >
            <Trophy className="w-4 h-4" />
            Suggest a Game
          </a>
        </div>
      </section>
    </div>
  );
}
