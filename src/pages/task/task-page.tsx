import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCheck,
  Ellipsis,
  Flag,
  MessageSquareMore,
  Plus,
} from "lucide-react";

const TaskPage = () => {
  return (
    <div className="w-full">
      <div className="mb-5 flex flex-row items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Tasks</span>
          <span className="text-sm text-muted-foreground">
            Short description will be placed here.
          </span>
        </div>
        <div>
          <Button size="sm" onClick={() => console.log(true)}>
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div>
          <div className="flex flex-row items-center justify-between gap-2 max-w-xs bg-secondary p-2 rounded-tl-lg rounded-tr-lg">
            <div>To Do</div>
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-secondary max-w-xs p-2 rounded-bl-lg rounded-br-lg max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card size="sm" className="mx-auto w-full max-w-xs mt-3">
              <CardHeader>
                <div className="flex flex-row justify-between items-center gap-2">
                  <Badge variant="secondary">
                    <BadgeCheck data-icon="inline-start" />
                    Not Started
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log(true)}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-bold">Desing Home wiraframe</p>
                <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita obcaecati hic consequatur delectus provident
                  doloribus repellendus recusandae ab architecto ipsum
                  accusantium, ut magni non, sequi eius dicta. Dolores, aperiam
                  suscipit?
                </p>

                <div className="mb-3 mt-3">
                  <AvatarGroup className="grayscale">
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
                </div>

                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <Flag className="h-3 w-3 text-muted-foreground" />
                    <p className="text-muted-foreground text-xs">02 Nov 2024</p>
                  </div>
                  <div>
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>

                <Separator />
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row gap-1 items-center">
                    <MessageSquareMore className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between gap-2 max-w-xs bg-secondary p-2 rounded-tl-lg rounded-tr-lg">
            <div>To Do</div>
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-secondary max-w-xs p-2 rounded-bl-lg rounded-br-lg max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card size="sm" className="mx-auto w-full max-w-xs mt-3">
              <CardHeader>
                <div className="flex flex-row justify-between items-center gap-2">
                  <Badge variant="secondary">
                    <BadgeCheck data-icon="inline-start" />
                    Not Started
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log(true)}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-bold">Desing Home wiraframe</p>
                <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita obcaecati hic consequatur delectus provident
                  doloribus repellendus recusandae ab architecto ipsum
                  accusantium, ut magni non, sequi eius dicta. Dolores, aperiam
                  suscipit?
                </p>

                <div className="mb-3 mt-3">
                  <AvatarGroup className="grayscale">
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
                </div>

                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <Flag className="h-3 w-3 text-muted-foreground" />
                    <p className="text-muted-foreground text-xs">02 Nov 2024</p>
                  </div>
                  <div>
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>

                <Separator />
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row gap-1 items-center">
                    <MessageSquareMore className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between gap-2 max-w-xs bg-secondary p-2 rounded-tl-lg rounded-tr-lg">
            <div>To Do</div>
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-secondary max-w-xs p-2 rounded-bl-lg rounded-br-lg max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card size="sm" className="mx-auto w-full max-w-xs mt-3">
              <CardHeader>
                <div className="flex flex-row justify-between items-center gap-2">
                  <Badge variant="secondary">
                    <BadgeCheck data-icon="inline-start" />
                    Not Started
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log(true)}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-bold">Desing Home wiraframe</p>
                <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita obcaecati hic consequatur delectus provident
                  doloribus repellendus recusandae ab architecto ipsum
                  accusantium, ut magni non, sequi eius dicta. Dolores, aperiam
                  suscipit?
                </p>

                <div className="mb-3 mt-3">
                  <AvatarGroup className="grayscale">
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
                </div>

                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <Flag className="h-3 w-3 text-muted-foreground" />
                    <p className="text-muted-foreground text-xs">02 Nov 2024</p>
                  </div>
                  <div>
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>

                <Separator />
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row gap-1 items-center">
                    <MessageSquareMore className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between gap-2 max-w-xs bg-secondary p-2 rounded-tl-lg rounded-tr-lg">
            <div>To Do</div>
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-secondary max-w-xs p-2 rounded-bl-lg rounded-br-lg max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card size="sm" className="mx-auto w-full max-w-xs mt-3">
              <CardHeader>
                <div className="flex flex-row justify-between items-center gap-2">
                  <Badge variant="secondary">
                    <BadgeCheck data-icon="inline-start" />
                    Not Started
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log(true)}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-bold">Desing Home wiraframe</p>
                <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita obcaecati hic consequatur delectus provident
                  doloribus repellendus recusandae ab architecto ipsum
                  accusantium, ut magni non, sequi eius dicta. Dolores, aperiam
                  suscipit?
                </p>

                <div className="mb-3 mt-3">
                  <AvatarGroup className="grayscale">
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
                </div>

                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <Flag className="h-3 w-3 text-muted-foreground" />
                    <p className="text-muted-foreground text-xs">02 Nov 2024</p>
                  </div>
                  <div>
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>

                <Separator />
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row gap-1 items-center">
                    <MessageSquareMore className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
