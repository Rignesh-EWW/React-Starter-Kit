import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { useData } from "../context/DataContext";

export default function SettingsPage() {
  const { settings, updateSettings } = useData();
  const [forceUpdate, setForceUpdate] = useState(settings.forceUpdate);
  const [latestVersion, setLatestVersion] = useState(settings.latestVersion);
  const [minSupportedVersion, setMinSupportedVersion] = useState(settings.minSupportedVersion);
  const [deprecatedInput, setDeprecatedInput] = useState(settings.deprecatedVersions.join(", "));
  const [featureToggles, setFeatureToggles] = useState(settings.featureToggles);
  const [privacyPolicy, setPrivacyPolicy] = useState(settings.privacyPolicy);
  const [terms, setTerms] = useState(settings.terms);

  useEffect(() => {
    setForceUpdate(settings.forceUpdate);
    setLatestVersion(settings.latestVersion);
    setMinSupportedVersion(settings.minSupportedVersion);
    setDeprecatedInput(settings.deprecatedVersions.join(", "));
    setFeatureToggles(settings.featureToggles);
    setPrivacyPolicy(settings.privacyPolicy);
    setTerms(settings.terms);
  }, [settings]);

  const persistAppSettings = () => {
    updateSettings({
      forceUpdate,
      latestVersion,
      minSupportedVersion,
      deprecatedVersions: deprecatedInput
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      featureToggles,
    });
  };

  const persistPolicies = () => {
    updateSettings({ privacyPolicy, terms });
  };

  const toggleFeature = (key: string) => {
    setFeatureToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">App governance and compliance controls</p>
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>App versioning</CardTitle>
            <CardDescription>Force updates and support matrix.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-base">Force update</Label>
                <p className="text-sm text-muted-foreground">Require users to upgrade to the latest build.</p>
              </div>
              <Switch checked={forceUpdate} onCheckedChange={setForceUpdate} />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="latest">Latest version</Label>
                <Input id="latest" value={latestVersion} onChange={(e) => setLatestVersion(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="minVersion">Minimum supported</Label>
                <Input id="minVersion" value={minSupportedVersion} onChange={(e) => setMinSupportedVersion(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Deprecated versions (comma separated)</Label>
              <Input value={deprecatedInput} onChange={(e) => setDeprecatedInput(e.target.value)} />
            </div>

            <Button onClick={persistAppSettings}>Save app settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature toggles</CardTitle>
            <CardDescription>Enable or disable product capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(featureToggles).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{key}</p>
                  <p className="text-xs text-muted-foreground">Control rollout visibility.</p>
                </div>
                <Switch checked={value} onCheckedChange={() => toggleFeature(key)} />
              </div>
            ))}
            <Button onClick={persistAppSettings}>Save toggles</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Privacy policy</CardTitle>
            <CardDescription>Rich text editor for compliance content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReactQuill theme="snow" value={privacyPolicy} onChange={setPrivacyPolicy} />
            <Button onClick={persistPolicies}>Save privacy policy</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Terms & conditions</CardTitle>
            <CardDescription>Keep your terms up to date.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReactQuill theme="snow" value={terms} onChange={setTerms} />
            <Button onClick={persistPolicies}>Save terms</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
