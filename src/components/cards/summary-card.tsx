import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { personalInfo } from '@/data/content';

export function SummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{personalInfo.summary}</p>
      </CardContent>
    </Card>
  );
}
