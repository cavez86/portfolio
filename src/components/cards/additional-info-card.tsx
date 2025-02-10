import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { additionalInfo } from '@/data/content';

export function AdditionalInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{additionalInfo}</p>
      </CardContent>
    </Card>
  );
}
