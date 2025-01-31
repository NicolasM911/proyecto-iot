// 'use client';

// import { useState, useEffect } from 'react';
// import { Header } from '@/components/layout/header';
// import { Sidebar } from '@/components/layout/sidebar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { toast } from '@/components/ui/use-toast';
// import { AlertCircle } from 'lucide-react';

// export default function Alerts() {
//   const [mounted, setMounted] = useState(false);
//   const [tempThresholds, setTempThresholds] = useState({
//     min: 18,
//     max: 26,
//   });
//   const [humidityThresholds, setHumidityThresholds] = useState({
//     min: 30,
//     max: 60,
//   });
//   const [alertsEnabled, setAlertsEnabled] = useState(true);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   const handleSave = () => {
//     toast({
//       title: 'Alert settings saved',
//       description: 'Your alert thresholds have been updated.',
//     });
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <div className="flex-1 flex">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <div className="container mx-auto space-y-6">
//             <div className="flex justify-between items-center">
//               <h1 className="text-3xl font-bold">Alert Settings</h1>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   checked={alertsEnabled}
//                   onCheckedChange={setAlertsEnabled}
//                 />
//                 <Label>Enable Alerts</Label>
//               </div>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Temperature Alerts</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>Minimum Temperature (°C)</Label>
//                     <Input
//                       type="number"
//                       value={tempThresholds.min}
//                       onChange={(e) =>
//                         setTempThresholds((prev) => ({
//                           ...prev,
//                           min: parseFloat(e.target.value),
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Maximum Temperature (°C)</Label>
//                     <Input
//                       type="number"
//                       value={tempThresholds.max}
//                       onChange={(e) =>
//                         setTempThresholds((prev) => ({
//                           ...prev,
//                           max: parseFloat(e.target.value),
//                         }))
//                       }
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Humidity Alerts</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>Minimum Humidity (%)</Label>
//                     <Input
//                       type="number"
//                       value={humidityThresholds.min}
//                       onChange={(e) =>
//                         setHumidityThresholds((prev) => ({
//                           ...prev,
//                           min: parseFloat(e.target.value),
//                         }))
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Maximum Humidity (%)</Label>
//                     <Input
//                       type="number"
//                       value={humidityThresholds.max}
//                       onChange={(e) =>
//                         setHumidityThresholds((prev) => ({
//                           ...prev,
//                           max: parseFloat(e.target.value),
//                         }))
//                       }
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card className="bg-muted">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <AlertCircle className="h-6 w-6 text-primary" />
//                   <div>
//                     <h3 className="font-semibold">Alert Preview</h3>
//                     <p className="text-sm text-muted-foreground">
//                       You will be notified when:
//                       <br />
//                       - Temperature is below {tempThresholds.min}°C or above{' '}
//                       {tempThresholds.max}°C
//                       <br />
//                       - Humidity is below {humidityThresholds.min}% or above{' '}
//                       {humidityThresholds.max}%
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="flex justify-end">
//               <Button onClick={handleSave}>Save Alert Settings</Button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }