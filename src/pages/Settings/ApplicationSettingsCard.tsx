import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { BaseDirectory, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState } from "react";

function ApplicationSettingsCard() {
  const [applicationId, saveApplicationId] = useLocalStorage(
    "application-id",
    ""
  );

  const [certFileName, setCertFileName] = useLocalStorage("certFileName", "");
  const [certFileContent, setCertFileContent] = useLocalStorage(
    "certFileContent",
    ""
  );

  const [keyFileName, setKeyFileName] = useLocalStorage("certKeyName", "");
  const [keyFileContent, setKeyFileContent] = useLocalStorage(
    "certKeyContent",
    ""
  );

  
  const [applicationSetup, setApplicationSetup] = useLocalStorage(
    "application-setup",
    false
  );
  const [errors, setErrors] = useState("");

  useEffect(()=>{
    console.log("effect")
    console.log(applicationId)
    if(!applicationId){
      setApplicationSetup(false)
      setErrors("Please set an application ID")
      return;
    }
    if(!keyFileContent){
      setApplicationSetup(false)
      setErrors("Please upload your mTLS key")
      return;
    }
    if(!certFileContent){
      setApplicationSetup(false)
      setErrors("Please upload your mTLS cert")
      return;
    }

    try {
      const certContent = window.atob(certFileContent)
      console.log(certContent)
      console.log(certContent.startsWith("-----BEGIN CERTIFICATE-----"))
      if(!certContent.startsWith("-----BEGIN CERTIFICATE-----")){
        setErrors("Invalid mTLS cert")
        setApplicationSetup(false)
        return
      }
    } catch(e) {
      console.log(certFileContent)
      console.log(e)
      setErrors("Invalid mTLS cert")
      setApplicationSetup(false)
      return
    }

    try {
      const keyContent = window.atob(keyFileContent)
      console.log(keyContent)
      console.log(keyContent.startsWith("-----BEGIN PRIVATE KEY-----"))
      if(!keyContent.startsWith("-----BEGIN PRIVATE KEY-----")){
        setErrors("Invalid mTLS cert")
        setApplicationSetup(false)
        return
      }
    } catch(e) {
      console.log(certFileContent)
      console.log(e)
      setErrors("Invalid mTLS key")
      setApplicationSetup(false)
      return
    }

    setErrors("")
    setApplicationSetup(true)

  }, [keyFileContent, certFileContent, applicationId])

  const certFileInputRef = useCallback((node: any) => {
    if (node !== null) {
      console.log("ref", node); // node = elRef.current

      const myFile = new File(["Hello World!"], certFileName, {
        type: "text/plain",
        lastModified: +new Date(),
      });

      // Now let's create a DataTransfer to get a FileList
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(myFile);
      node.files = dataTransfer.files;
      
    }
  }, []);

  const keyFileInputRef = useCallback((node: any) => {
    if (node !== null) {
      console.log("ref", node); // node = elRef.current

      const myFile = new File(["Hello World!"], keyFileName, {
        type: "text/plain",
        lastModified: +new Date(),
      });

      // Now let's create a DataTransfer to get a FileList
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(myFile);
      node.files = dataTransfer.files;
    }
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{applicationSetup ? <Button variant="outline">Edit Application Settings</Button> :<Button variant="outline">Set Application Settings</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Application Settings</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="application-id">Application ID</Label>
                <Input
                  id="application-id"
                  placeholder="app_000000000000000000"
                  value={applicationId}
                  onChange={(e: any) => saveApplicationId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cert">Cert</Label>
                <Input
                  id="cert"
                  type="file"
                  onChange={async (e: any) => {
                    try {
                      const file = e?.target?.files?.[0];
                      if (file) {
                        setCertFileName(file.name);

                        // Use FileReader to read the file content as a Base64 string
                        const reader = new FileReader();
                        reader.onload = async () => {
                          const base64Content = (reader?.result as any)?.split(
                            ","
                          )?.[1];
                          setCertFileName(file.name);
                          setCertFileContent(base64Content);
                          await (mkdir('', {
                            baseDir: BaseDirectory.AppData,
                          }).catch(console.log));
                          await writeTextFile('cert.pem', window.atob(base64Content), {
                            baseDir: BaseDirectory.AppData,
                          });
                        };
                        reader.readAsDataURL(file);
                        
                      } else {
                        const myFile = new File(["Hello World!"], certFileName, {
                          type: "text/plain",
                          lastModified: +new Date(),
                        });
                  
                        // Now let's create a DataTransfer to get a FileList
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(myFile);
                        e.target.files = dataTransfer.files;
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  ref={certFileInputRef}
                />
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  type="file"
                  onChange={async (e: any) => {
                    try {
                      const file = e?.target?.files?.[0];
                      if (file) {
                        setKeyFileName(file.name);

                        // Use FileReader to read the file content as a Base64 string
                        const reader = new FileReader();
                        reader.onload = async () => {
                          const base64Content = (reader?.result as any)?.split(
                            ","
                          )?.[1];
                          setKeyFileName(file.name);
                          setKeyFileContent(base64Content);
                          await (mkdir('', {
                            baseDir: BaseDirectory.AppData,
                          }).catch(console.log));
                          await writeTextFile('key.pem', window.atob(base64Content), {
                            baseDir: BaseDirectory.AppData,
                          });
                        };
                        reader.readAsDataURL(file);
                      } else {
                        const myFile = new File(["Hello World!"], keyFileName, {
                          type: "text/plain",
                          lastModified: +new Date(),
                        });
                  
                        // Now let's create a DataTransfer to get a FileList
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(myFile);
                        e.target.files = dataTransfer.files;
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  ref={keyFileInputRef}
                />
                <p className="text-red-900">{errors}</p>
                <p>{applicationSetup ? <p>Teller Connection Setup</p> :<p>Please fill out application details</p>}</p>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ApplicationSettingsCard;
