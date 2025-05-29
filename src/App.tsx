import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, Zap, Settings, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Interfaces
interface CalculationResults {
  [key: string]: number;
}

interface ChartDataPoint {
  frequency: number;
  magnitude: number;
  phase: number;
}

interface Tab {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

const CircuitCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ohm');
  const [results, setResults] = useState<CalculationResults>({});
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Valores estándar E12 y E24
  const E12_VALUES: number[] = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
  const E24_VALUES: number[] = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];

  // Función para encontrar el valor estándar más cercano
  const findClosestStandardValue = (value: number, series: 'E12' | 'E24' = 'E12'): number => {
    const values = series === 'E12' ? E12_VALUES : E24_VALUES;
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalizedValue = value / magnitude;
    
    let closest = values[0];
    let minDiff = Math.abs(normalizedValue - values[0]);
    
    for (const val of values) {
      const diff = Math.abs(normalizedValue - val);
      if (diff < minDiff) {
        minDiff = diff;
        closest = val;
      }
    }
    
    return closest * magnitude;
  };

  // Componente para cálculos de Ley de Ohm
  const OhmLawCalculator: React.FC = () => {
    const [voltage, setVoltage] = useState<string>('');
    const [current, setCurrent] = useState<string>('');
    const [resistance, setResistance] = useState<string>('');
    const [power, setPower] = useState<string>('');

    const calculate = (): void => {
      const V = parseFloat(voltage) || 0;
      const I = parseFloat(current) || 0;
      const R = parseFloat(resistance) || 0;
      const P = parseFloat(power) || 0;

      const newResults: CalculationResults = {};

      if (V && I) {
        newResults.resistance = V / I;
        newResults.power = V * I;
      } else if (V && R) {
        newResults.current = V / R;
        newResults.power = (V * V) / R;
      } else if (I && R) {
        newResults.voltage = I * R;
        newResults.power = I * I * R;
      } else if (V && P) {
        newResults.current = P / V;
        newResults.resistance = (V * V) / P;
      } else if (I && P) {
        newResults.voltage = P / I;
        newResults.resistance = P / (I * I);
      } else if (R && P) {
        newResults.voltage = Math.sqrt(P * R);
        newResults.current = Math.sqrt(P / R);
      }

      setResults(newResults);
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Ley de Ohm</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voltaje (V)</label>
            <input
              type="number"
              value={voltage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVoltage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Voltios"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corriente (A)</label>
            <input
              type="number"
              value={current}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amperios"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resistencia (Ω)</label>
            <input
              type="number"
              value={resistance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResistance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ohmios"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potencia (W)</label>
            <input
              type="number"
              value={power}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPower(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Vatios"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calcular
        </button>
        {Object.keys(results).length > 0 && (
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-semibold text-green-800 mb-2">Resultados:</h4>
            {results.voltage && <p>Voltaje: {results.voltage.toFixed(3)} V</p>}
            {results.current && <p>Corriente: {results.current.toFixed(3)} A</p>}
            {results.resistance && <p>Resistencia: {results.resistance.toFixed(3)} Ω</p>}
            {results.power && <p>Potencia: {results.power.toFixed(3)} W</p>}
          </div>
        )}
      </div>
    );
  };

  // Componente para divisor de voltaje
  const VoltageDividerCalculator: React.FC = () => {
    const [inputVoltage, setInputVoltage] = useState<string>('');
    const [r1, setR1] = useState<string>('');
    const [r2, setR2] = useState<string>('');
    const [desiredOutput, setDesiredOutput] = useState<string>('');
    const [series, setSeries] = useState<'E12' | 'E24'>('E12');

    const calculateDivider = (): void => {
      const Vin = parseFloat(inputVoltage) || 0;
      const R1 = parseFloat(r1) || 0;
      const R2 = parseFloat(r2) || 0;
      const Vout_desired = parseFloat(desiredOutput) || 0;

      const newResults: CalculationResults = {};

      if (Vin && R1 && R2) {
        const Vout = Vin * (R2 / (R1 + R2));
        newResults.outputVoltage = Vout;
        newResults.current = Vin / (R1 + R2);
        newResults.powerR1 = Math.pow(newResults.current, 2) * R1;
        newResults.powerR2 = Math.pow(newResults.current, 2) * R2;
      } else if (Vin && R1 && Vout_desired) {
        const R2_calc = (Vout_desired * R1) / (Vin - Vout_desired);
        const R2_standard = findClosestStandardValue(R2_calc, series);
        newResults.r2Calculated = R2_calc;
        newResults.r2Standard = R2_standard;
        newResults.actualOutput = Vin * (R2_standard / (R1 + R2_standard));
        newResults.current = Vin / (R1 + R2_standard);
      }

      setResults(newResults);
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Divisor de Voltaje</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voltaje de Entrada (V)</label>
            <input
              type="number"
              value={inputVoltage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputVoltage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">R1 (Ω)</label>
            <input
              type="number"
              value={r1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setR1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">R2 (Ω)</label>
            <input
              type="number"
              value={r2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setR2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voltaje Deseado (V)</label>
            <input
              type="number"
              value={desiredOutput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesiredOutput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Serie de Valores</label>
          <select
            value={series}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSeries(e.target.value as 'E12' | 'E24')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="E12">E12 (±10%)</option>
            <option value="E24">E24 (±5%)</option>
          </select>
        </div>
        <button
          onClick={calculateDivider}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calcular
        </button>
        {Object.keys(results).length > 0 && (
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-semibold text-green-800 mb-2">Resultados:</h4>
            {results.outputVoltage && <p>Voltaje de Salida: {results.outputVoltage.toFixed(3)} V</p>}
            {results.r2Calculated && <p>R2 Calculado: {results.r2Calculated.toFixed(3)} Ω</p>}
            {results.r2Standard && <p>R2 Estándar ({series}): {results.r2Standard.toFixed(3)} Ω</p>}
            {results.actualOutput && <p>Voltaje Real: {results.actualOutput.toFixed(3)} V</p>}
            {results.current && <p>Corriente: {results.current.toFixed(6)} A</p>}
            {results.powerR1 && <p>Potencia R1: {results.powerR1.toFixed(6)} W</p>}
            {results.powerR2 && <p>Potencia R2: {results.powerR2.toFixed(6)} W</p>}
          </div>
        )}
      </div>
    );
  };

  // Componente para filtros RC
  const FilterCalculator: React.FC = () => {
    const [filterType, setFilterType] = useState<'lowpass' | 'highpass'>('lowpass');
    const [resistance, setResistance] = useState<string>('1000');
    const [capacitance, setCapacitance] = useState<string>('0.000001');
    const [cutoffFreq, setCutoffFreq] = useState<string>('');

    const calculateFilter = (): void => {
      const R = parseFloat(resistance) || 1000;
      const C = parseFloat(capacitance) || 0.000001;
      const fc = parseFloat(cutoffFreq) || 0;

      const newResults: CalculationResults = {};
      let calculatedFc: number;

      if (R && C) {
        calculatedFc = 1 / (2 * Math.PI * R * C);
        newResults.cutoffFrequency = calculatedFc;
      } else if (fc && R) {
        const C_calc = 1 / (2 * Math.PI * R * fc);
        newResults.capacitance = C_calc;
        calculatedFc = fc;
      } else if (fc && C) {
        const R_calc = 1 / (2 * Math.PI * C * fc);
        newResults.resistance = R_calc;
        calculatedFc = fc;
      }

      // Generar datos para la gráfica de respuesta en frecuencia
      if (calculatedFc!) {
        const data: ChartDataPoint[] = [];
        const startFreq = calculatedFc / 100;
        const endFreq = calculatedFc * 100;
        const steps = 100;
        
        for (let i = 0; i <= steps; i++) {
          const freq = startFreq * Math.pow(endFreq / startFreq, i / steps);
          const omega = 2 * Math.PI * freq;
          let magnitude: number;
          
          if (filterType === 'lowpass') {
            magnitude = 1 / Math.sqrt(1 + Math.pow(omega * R * C, 2));
          } else {
            magnitude = (omega * R * C) / Math.sqrt(1 + Math.pow(omega * R * C, 2));
          }
          
          const magnitudeDB = 20 * Math.log10(magnitude);
          
          data.push({
            frequency: freq,
            magnitude: magnitudeDB,
            phase: filterType === 'lowpass' ? 
              -Math.atan(omega * R * C) * 180 / Math.PI :
              90 - Math.atan(omega * R * C) * 180 / Math.PI
          });
        }
        
        setChartData(data);
      }

      setResults(newResults);
    };

    useEffect(() => {
      calculateFilter();
    }, [resistance, capacitance, cutoffFreq, filterType]);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Filtros RC</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Filtro</label>
          <select
            value={filterType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value as 'lowpass' | 'highpass')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="lowpass">Pasa Bajos</option>
            <option value="highpass">Pasa Altos</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resistencia (Ω)</label>
            <input
              type="number"
              value={resistance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResistance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacitancia (F)</label>
            <input
              type="number"
              step="0.000000001"
              value={capacitance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacitance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Freq. Corte (Hz)</label>
            <input
              type="number"
              value={cutoffFreq}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCutoffFreq(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {Object.keys(results).length > 0 && (
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-semibold text-green-800 mb-2">Resultados:</h4>
            {results.cutoffFrequency && <p>Frecuencia de Corte: {results.cutoffFrequency.toFixed(2)} Hz</p>}
            {results.capacitance && <p>Capacitancia: {results.capacitance.toExponential(3)} F</p>}
            {results.resistance && <p>Resistencia: {results.resistance.toFixed(2)} Ω</p>}
          </div>
        )}

        {chartData.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-2">Respuesta en Frecuencia</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="frequency" 
                    scale="log" 
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value: number) => `${value.toExponential(1)}`}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)} ${name === 'magnitude' ? 'dB' : '°'}`, 
                      name === 'magnitude' ? 'Magnitud' : 'Fase'
                    ]} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="magnitude" 
                    stroke="#2563eb" 
                    name="Magnitud (dB)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabs: Tab[] = [
    { id: 'ohm', name: 'Ley de Ohm', icon: Zap, component: OhmLawCalculator },
    { id: 'divider', name: 'Divisor de Voltaje', icon: Settings, component: VoltageDividerCalculator },
    { id: 'filter', name: 'Filtros RC', icon: BarChart3, component: FilterCalculator },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || OhmLawCalculator;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-900">
          Calculadora de Diseño de Circuitos Electrónicos
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={18} />
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <ActiveComponent />
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Información sobre valores estándar:</h3>
        <p>• <strong>E12</strong>: Tolerancia ±10% - Valores: 1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2</p>
        <p>• <strong>E24</strong>: Tolerancia ±5% - Incluye todos los valores E12 más valores intermedios</p>
        <p>• Los valores se multiplican por potencias de 10 (ej: 1.2Ω, 12Ω, 120Ω, 1.2kΩ, etc.)</p>
      </div>
    </div>
  );
};

export default CircuitCalculator;