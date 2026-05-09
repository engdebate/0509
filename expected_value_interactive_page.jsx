import React, { useMemo, useState } from "react";

function Card({ children, className = "" }) {
  return <div className={`bg-white border border-slate-100 ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, onClick, variant = "default", className = "" }) {
  const base = "px-4 py-2 text-sm font-medium transition border";
  const styles =
    variant === "outline"
      ? "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
      : "bg-slate-900 text-white border-slate-900 hover:bg-slate-700";

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

function IconBox({ children }) {
  return <div className="text-3xl leading-none">{children}</div>;
}

export default function ExpectedValueInteractivePage() {
  const [values, setValues] = useState([1, 2, 3, 4, 5, 6]);
  const [weights, setWeights] = useState([1, 1, 1, 1, 1, 1]);

  const totalWeight = weights.reduce((sum, w) => sum + Number(w), 0);

  const probabilities = useMemo(() => {
    if (totalWeight === 0) return weights.map(() => 0);
    return weights.map((w) => Number(w) / totalWeight);
  }, [weights, totalWeight]);

  const expectedValue = useMemo(() => {
    return values.reduce((sum, x, i) => sum + Number(x) * probabilities[i], 0);
  }, [values, probabilities]);

  const weightedTerms = values.map((x, i) => Number(x) * probabilities[i]);

  const resetFairDice = () => {
    setValues([1, 2, 3, 4, 5, 6]);
    setWeights([1, 1, 1, 1, 1, 1]);
  };

  const loadBiasedDice = () => {
    setValues([1, 2, 3, 4, 5, 6]);
    setWeights([1, 1, 1, 1, 1, 5]);
  };

  const loadGameExample = () => {
    setValues([-10, 0, 20, 50, 100, 200]);
    setWeights([40, 30, 15, 10, 4, 1]);
  };

  const updateValue = (index, newValue) => {
    const next = [...values];
    next[index] = Number(newValue);
    setValues(next);
  };

  const updateWeight = (index, newWeight) => {
    const next = [...weights];
    next[index] = Math.max(0, Number(newWeight));
    setWeights(next);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm text-slate-600">
            <span>🎯</span>
            Probability｜Expected Value｜Weighted Average
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            什麼是期望值？
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            期望值不是「最可能發生的結果」，而是如果重複很多次，平均下來會接近的數值。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-3">
              <IconBox>🧮</IconBox>
              <h2 className="text-xl font-semibold">核心公式</h2>
              <div className="bg-slate-100 rounded-xl p-4 text-center text-xl font-mono">
                E(X) = Σ x · P(x)
              </div>
              <p className="text-slate-600 leading-relaxed">
                每個結果乘上它發生的機率，再全部加起來。
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-3">
              <IconBox>🎲</IconBox>
              <h2 className="text-xl font-semibold">骰子例子</h2>
              <p className="text-slate-600 leading-relaxed">
                公平骰子的期望值是 3.5，雖然你不可能擲出 3.5 點。
              </p>
              <div className="bg-slate-100 rounded-xl p-4 text-center text-xl font-semibold">
                1, 2, 3, 4, 5, 6 的平均
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-3">
              <IconBox>📈</IconBox>
              <h2 className="text-xl font-semibold">為什麼重要？</h2>
              <p className="text-slate-600 leading-relaxed">
                期望值可用來分析遊戲是否划算、抽獎平均報酬、保險風險與決策成本。
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">互動實驗：調整結果與機率</h2>
                <p className="text-slate-600 mt-2">
                  你可以改變每個結果的數值，也可以調整權重。權重越大，代表該結果越容易發生。
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={resetFairDice} variant="outline" className="rounded-xl">
                  公平骰子
                </Button>
                <Button onClick={loadBiasedDice} variant="outline" className="rounded-xl">
                  偏向 6 的骰子
                </Button>
                <Button onClick={loadGameExample} variant="outline" className="rounded-xl">
                  抽獎範例
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-2 font-bold text-lg">#{index + 1}</div>
                      <label className="col-span-5 text-sm text-slate-600">
                        結果 x
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updateValue(index, e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                        />
                      </label>
                      <label className="col-span-5 text-sm text-slate-600">
                        權重
                        <input
                          type="number"
                          min="0"
                          value={weights[index]}
                          onChange={(e) => updateWeight(index, e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                        />
                      </label>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-slate-500 mb-1">
                        <span>機率 P(x)</span>
                        <span>{(probabilities[index] * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 bg-slate-700 rounded-full transition-all"
                          style={{ width: `${probabilities[index] * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
                  <p className="text-slate-300">目前的期望值</p>
                  <div className="text-5xl md:text-6xl font-bold mt-3">
                    {Number.isFinite(expectedValue) ? expectedValue.toFixed(3) : "—"}
                  </div>
                  <p className="text-slate-300 mt-4 leading-relaxed">
                    這代表在相同規則下重複很多次後，平均每次大約會得到這個數值。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                  <h3 className="text-xl font-semibold">計算過程</h3>
                  <div className="space-y-2 text-sm md:text-base">
                    {values.map((value, index) => (
                      <div key={index} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                        <span>
                          {value} × {probabilities[index].toFixed(3)}
                        </span>
                        <span className="font-semibold">{weightedTerms[index].toFixed(3)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-lg font-bold flex justify-between">
                    <span>總和</span>
                    <span>{expectedValue.toFixed(3)}</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                  <h3 className="text-xl font-semibold mb-2">思考問題</h3>
                  <p className="text-slate-700 leading-relaxed">
                    如果一個抽獎遊戲的期望值是 -5，代表你每玩一次平均會損失 5 元。即使偶爾中獎，長期來看仍可能是不划算的選擇。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">一句話總結</h2>
            <p className="text-xl text-slate-700 leading-relaxed">
              期望值就是「把每個可能結果，按照它出現的機率加權後得到的平均值」。
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>🔁</span>
              試著把某個結果的權重調高，觀察期望值如何改變。
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
