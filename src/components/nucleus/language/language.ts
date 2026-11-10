import type { LanguageConfig } from '../types/playground';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: 'cpp',
    name: 'C++ 23',
    version: 'GCC 14.1 / Clang 18',
    monacoLanguage: 'cpp',
    defaultFileName: 'solution.cpp',
    extension: '.cpp',
    category: 'popular',
    iconColor: '#00599C',
    pistonLanguage: 'cpp',
    pistonVersion: '10.2.0',
    judge0Id: 54,
    templateCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

void solve() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s;
    if (cin >> s) {
        cout << "Hello, " << s << "!" << "\n";
    } else {
        cout << "Hello, Competitive Programmer from Nucleus!" << "\n";
    }
}

int main() {
    solve();
    return 0;
}
`
  },
  {
    id: 'python',
    name: 'Python 3',
    version: 'Python 3.12.3',
    monacoLanguage: 'python',
    defaultFileName: 'main.py',
    extension: '.py',
    category: 'popular',
    iconColor: '#3572A5',
    pistonLanguage: 'python',
    pistonVersion: '3.10.0',
    judge0Id: 71,
    templateCode: `import sys

def solve():
    # Read all tokens from standard input
    input_data = sys.stdin.read().split()
    if input_data:
        name = input_data[0]
        print(f"Hello, {name}!")
    else:
        print("Hello, Competitive Programmer from Nucleus!")

if __name__ == "__main__":
    solve()
`
  },
  {
    id: 'java',
    name: 'Java 21',
    version: 'OpenJDK 21.0.3 LTS',
    monacoLanguage: 'java',
    defaultFileName: 'Main.java',
    extension: '.java',
    category: 'popular',
    iconColor: '#B07219',
    pistonLanguage: 'java',
    pistonVersion: '15.0.2',
    judge0Id: 62,
    templateCode: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        
        String line = reader.readLine();
        if (line != null && !line.trim().isEmpty()) {
            out.println("Hello, " + line.trim() + "!");
        } else {
            out.println("Hello, Competitive Programmer from Nucleus!");
        }
        
        out.flush();
    }
}
`
  },
  {
    id: 'c',
    name: 'C',
    version: 'C17 (GCC 14.1)',
    monacoLanguage: 'c',
    defaultFileName: 'solution.c',
    extension: '.c',
    category: 'systems',
    iconColor: '#555555',
    pistonLanguage: 'c',
    pistonVersion: '10.2.0',
    judge0Id: 50,
    templateCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char input[256];
    if (scanf("%255s", input) == 1) {
        printf("Hello, %s!\\n", input);
    } else {
        printf("Hello, Competitive Programmer from Nucleus!\\n");
    }
    return 0;
}
`
  },
  {
    id: 'rust',
    name: 'Rust',
    version: 'Rust 1.78.0',
    monacoLanguage: 'rust',
    defaultFileName: 'main.rs',
    extension: '.rs',
    category: 'popular',
    iconColor: '#DEA584',
    pistonLanguage: 'rust',
    pistonVersion: '1.68.2',
    judge0Id: 73,
    templateCode: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();

    if let Some(Ok(line)) = lines.next() {
        let trimmed = line.trim();
        if !trimmed.is_empty() {
            println!("Hello, {}!", trimmed);
            return;
        }
    }
    println!("Hello, Competitive Programmer from Nucleus!");
}
`
  },
  {
    id: 'go',
    name: 'Go',
    version: 'Go 1.22.3',
    monacoLanguage: 'go',
    defaultFileName: 'main.go',
    extension: '.go',
    category: 'popular',
    iconColor: '#00ADD8',
    pistonLanguage: 'go',
    pistonVersion: '1.16.2',
    judge0Id: 60,
    templateCode: `package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    if scanner.Scan() {
        text := strings.TrimSpace(scanner.Text())
        if text != "" {
            fmt.Printf("Hello, %s!\\n", text)
            return
        }
    }
    fmt.Println("Hello, Competitive Programmer from Nucleus!")
}
`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    version: 'Node.js 20.13 LTS',
    monacoLanguage: 'javascript',
    defaultFileName: 'index.js',
    extension: '.js',
    category: 'web',
    iconColor: '#F7DF1E',
    pistonLanguage: 'javascript',
    pistonVersion: '18.15.0',
    judge0Id: 63,
    templateCode: `const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (input) {
        console.log(\`Hello, \${input}!\`);
    } else {
        console.log("Hello, Competitive Programmer from Nucleus!");
    }
}

solve();
`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    version: 'TypeScript 5.4.5',
    monacoLanguage: 'typescript',
    defaultFileName: 'index.ts',
    extension: '.ts',
    category: 'web',
    iconColor: '#3178C6',
    pistonLanguage: 'typescript',
    pistonVersion: '5.0.3',
    judge0Id: 74,
    templateCode: `import * as fs from 'fs';

function solve(): void {
    const input: string = fs.readFileSync(0, 'utf-8').trim();
    if (input) {
        console.log(\`Hello, \${input}!\`);
    } else {
        console.log("Hello, Competitive Programmer from Nucleus!");
    }
}

solve();
`
  },
  {
    id: 'csharp',
    name: 'C#',
    version: '.NET 8.0',
    monacoLanguage: 'csharp',
    defaultFileName: 'Program.cs',
    extension: '.cs',
    category: 'popular',
    iconColor: '#178600',
    pistonLanguage: 'csharp',
    pistonVersion: '6.12.0',
    judge0Id: 51,
    templateCode: `using System;

public class Program
{
    public static void Main()
    {
        string input = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
        {
            Console.WriteLine($"Hello, {input.Trim()}!");
        }
        else
        {
            Console.WriteLine("Hello, Competitive Programmer from Nucleus!");
        }
    }
}
`
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    version: 'Kotlin 2.0.0',
    monacoLanguage: 'kotlin',
    defaultFileName: 'Main.kt',
    extension: '.kt',
    category: 'jvm',
    iconColor: '#A97BFF',
    pistonLanguage: 'kotlin',
    pistonVersion: '1.8.20',
    judge0Id: 78,
    templateCode: `import java.util.Scanner

fun main() {
    val scanner = Scanner(System.\`in\`)
    if (scanner.hasNextLine()) {
        val input = scanner.nextLine().trim()
        if (input.isNotEmpty()) {
            println("Hello, $input!")
            return
        }
    }
    println("Hello, Competitive Programmer from Nucleus!")
}
`
  },
  {
    id: 'swift',
    name: 'Swift',
    version: 'Swift 5.10',
    monacoLanguage: 'swift',
    defaultFileName: 'main.swift',
    extension: '.swift',
    category: 'popular',
    iconColor: '#F05138',
    pistonLanguage: 'swift',
    pistonVersion: '5.3.3',
    judge0Id: 83,
    templateCode: `import Foundation

if let line = readLine(), !line.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
    print("Hello, \\(line.trimmingCharacters(in: .whitespacesAndNewlines))!")
} else {
    print("Hello, Competitive Programmer from Nucleus!")
}
`
  },
  {
    id: 'ruby',
    name: 'Ruby',
    version: 'Ruby 3.3.1',
    monacoLanguage: 'ruby',
    defaultFileName: 'main.rb',
    extension: '.rb',
    category: 'scripting',
    iconColor: '#701516',
    pistonLanguage: 'ruby',
    pistonVersion: '3.0.1',
    judge0Id: 72,
    templateCode: `input = gets
if input && !input.strip.empty?
  puts "Hello, #{input.strip}!"
else
  puts "Hello, Competitive Programmer from Nucleus!"
end
`
  },
  {
    id: 'php',
    name: 'PHP',
    version: 'PHP 8.3.6',
    monacoLanguage: 'php',
    defaultFileName: 'main.php',
    extension: '.php',
    category: 'web',
    iconColor: '#4F5D95',
    pistonLanguage: 'php',
    pistonVersion: '8.2.3',
    judge0Id: 68,
    templateCode: `<?php
$input = trim(fgets(STDIN));
if (!empty($input)) {
    echo "Hello, " . $input . "!\n";
} else {
    echo "Hello, Competitive Programmer from Nucleus!\n";
}
?>
`
  },
  {
    id: 'scala',
    name: 'Scala',
    version: 'Scala 3.4.1',
    monacoLanguage: 'scala',
    defaultFileName: 'Main.scala',
    extension: '.scala',
    category: 'jvm',
    iconColor: '#DC322F',
    pistonLanguage: 'scala',
    pistonVersion: '3.2.2',
    judge0Id: 81,
    templateCode: `import scala.io.StdIn

object Main {
  def main(args: Array[String]): Unit = {
    val input = StdIn.readLine()
    if (input != null && input.trim.nonEmpty) {
      println(s"Hello, \${input.trim}!")
    } else {
      println("Hello, Competitive Programmer from Nucleus!")
    }
  }
}
`
  },
  {
    id: 'haskell',
    name: 'Haskell',
    version: 'GHC 9.8.2',
    monacoLanguage: 'haskell',
    defaultFileName: 'Main.hs',
    extension: '.hs',
    category: 'functional',
    iconColor: '#5E5086',
    pistonLanguage: 'haskell',
    pistonVersion: '9.0.1',
    judge0Id: 61,
    templateCode: `module Main where

import System.IO
import Data.Char (isSpace)

trim :: String -> String
trim = f . f where f = reverse . dropWhile isSpace

main :: IO ()
main = do
    eof <- isEOF
    if eof
        then putStrLn "Hello, Competitive Programmer from Nucleus!"
        else do
            input <- getLine
            let clean = trim input
            if null clean
                then putStrLn "Hello, Competitive Programmer from Nucleus!"
                else putStrLn ("Hello, " ++ clean ++ "!")
`
  },
  {
    id: 'dart',
    name: 'Dart',
    version: 'Dart 3.4.1',
    monacoLanguage: 'dart',
    defaultFileName: 'main.dart',
    extension: '.dart',
    category: 'popular',
    iconColor: '#00B4AB',
    pistonLanguage: 'dart',
    pistonVersion: '2.19.6',
    judge0Id: 90,
    templateCode: `import 'dart:io';

void main() {
  String? line = stdin.readLineSync();
  if (line != null && line.trim().isNotEmpty) {
    print('Hello, \${line.trim()}!');
  } else {
    print('Hello, Competitive Programmer from Nucleus!');
  }
}
`
  },
  {
    id: 'r',
    name: 'R',
    version: 'R 4.4.0',
    monacoLanguage: 'r',
    defaultFileName: 'main.r',
    extension: '.r',
    category: 'scripting',
    iconColor: '#198CE7',
    pistonLanguage: 'r',
    pistonVersion: '4.1.1',
    judge0Id: 80,
    templateCode: `input <- readLines('stdin', warn = FALSE)
if (length(input) > 0 && nchar(trimws(input[1])) > 0) {
  cat(paste0("Hello, ", trimws(input[1]), "!\n"))
} else {
  cat("Hello, Competitive Programmer from Nucleus!\n")
}
`
  },
  {
    id: 'julia',
    name: 'Julia',
    version: 'Julia 1.10.3',
    monacoLanguage: 'julia',
    defaultFileName: 'main.jl',
    extension: '.jl',
    category: 'functional',
    iconColor: '#A270BA',
    pistonLanguage: 'julia',
    pistonVersion: '1.8.5',
    judge0Id: 91,
    templateCode: `function solve()
    if !eof(stdin)
        line = strip(readline(stdin))
        if !isempty(line)
            println("Hello, $line!")
            return
        end
    end
    println("Hello, Competitive Programmer from Nucleus!")
end

solve()
`
  },
  {
    id: 'elixir',
    name: 'Elixir',
    version: 'Elixir 1.16.2',
    monacoLanguage: 'elixir',
    defaultFileName: 'main.exs',
    extension: '.exs',
    category: 'functional',
    iconColor: '#6E4A7E',
    pistonLanguage: 'elixir',
    pistonVersion: '1.11.3',
    judge0Id: 57,
    templateCode: `defmodule Main do
  def solve do
    input = IO.read(:stdio, :line)
    case input do
      :eof -> IO.puts("Hello, Competitive Programmer from Nucleus!")
      nil -> IO.puts("Hello, Competitive Programmer from Nucleus!")
      text ->
        clean = String.trim(text)
        if clean != "" do
          IO.puts("Hello, #{clean}!")
        else
          IO.puts("Hello, Competitive Programmer from Nucleus!")
        end
    end
  end
end

Main.solve()
`
  },
  {
    id: 'erlang',
    name: 'Erlang',
    version: 'Erlang/OTP 26.2',
    monacoLanguage: 'erlang',
    defaultFileName: 'main.erl',
    extension: '.erl',
    category: 'functional',
    iconColor: '#B83998',
    pistonLanguage: 'erlang',
    pistonVersion: '23.0.0',
    judge0Id: 58,
    templateCode: `-module(main).
-export([start/0]).

start() ->
    case io:get_line("") of
        eof ->
            io:format("Hello, Competitive Programmer from Nucleus!~n");
        Line ->
            Clean = string:trim(Line),
            case Clean of
                "" -> io:format("Hello, Competitive Programmer from Nucleus!~n");
                _ -> io:format("Hello, ~s!~n", [Clean])
            end
    end.
`
  },
  {
    id: 'clojure',
    name: 'Clojure',
    version: 'Clojure 1.11.1',
    monacoLanguage: 'clojure',
    defaultFileName: 'main.clj',
    extension: '.clj',
    category: 'jvm',
    iconColor: '#5881D8',
    pistonLanguage: 'clojure',
    pistonVersion: '1.10.3',
    judge0Id: 86,
    templateCode: `(ns main
  (:require [clojure.string :as str]))

(defn -main [& args]
  (let [input (read-line)]
    (if (and input (not (str/blank? input)))
      (println (str "Hello, " (str/trim input) "!"))
      (println "Hello, Competitive Programmer from Nucleus!"))))

(-main)
`
  },
  {
    id: 'lua',
    name: 'Lua',
    version: 'Lua 5.4.6',
    monacoLanguage: 'lua',
    defaultFileName: 'main.lua',
    extension: '.lua',
    category: 'scripting',
    iconColor: '#000080',
    pistonLanguage: 'lua',
    pistonVersion: '5.4.4',
    judge0Id: 64,
    templateCode: `local input = io.read()
if input and input:match("%S") then
    print(string.format("Hello, %s!", input:match("^%s*(.-)%s*$")))
else
    print("Hello, Competitive Programmer from Nucleus!")
end
`
  },
  {
    id: 'perl',
    name: 'Perl',
    version: 'Perl 5.38.2',
    monacoLanguage: 'perl',
    defaultFileName: 'main.pl',
    extension: '.pl',
    category: 'scripting',
    iconColor: '#0298C3',
    pistonLanguage: 'perl',
    pistonVersion: '5.36.0',
    judge0Id: 85,
    templateCode: `use strict;
use warnings;

my $input = <STDIN>;
if (defined $input) {
    chomp($input);
    $input =~ s/^\\s+|\\s+$//g;
    if (length($input) > 0) {
        print "Hello, $input!\\n";
        exit 0;
    }
}
print "Hello, Competitive Programmer from Nucleus!\\n";
`
  },
  {
    id: 'zig',
    name: 'Zig',
    version: 'Zig 0.13.0',
    monacoLanguage: 'zig',
    defaultFileName: 'main.zig',
    extension: '.zig',
    category: 'systems',
    iconColor: '#EC915C',
    pistonLanguage: 'zig',
    pistonVersion: '0.10.1',
    judge0Id: 89,
    templateCode: `const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    const stdout = std.io.getStdOut().writer();

    var buffer: [256]u8 = undefined;
    if (try stdin.readUntilDelimiterOrEof(&buffer, '\\n')) |line| {
        const trimmed = std.mem.trim(u8, line, " \\r\\t");
        if (trimmed.len > 0) {
            try stdout.print("Hello, {s}!\\n", .{trimmed});
            return;
        }
    }
    try stdout.print("Hello, Competitive Programmer from Nucleus!\\n", .{});
}
`
  },
  {
    id: 'nim',
    name: 'Nim',
    version: 'Nim 2.0.4',
    monacoLanguage: 'nim',
    defaultFileName: 'main.nim',
    extension: '.nim',
    category: 'systems',
    iconColor: '#FFE953',
    pistonLanguage: 'nim',
    pistonVersion: '1.6.12',
    judge0Id: 88,
    templateCode: `import strutils

try:
  let input = stdin.readLine().strip()
  if input.len > 0:
    echo "Hello, ", input, "!"
  else:
    echo "Hello, Competitive Programmer from Nucleus!"
except EOFError:
  echo "Hello, Competitive Programmer from Nucleus!"
`
  },
  {
    id: 'd',
    name: 'D',
    version: 'DMD 2.108.1',
    monacoLanguage: 'd',
    defaultFileName: 'main.d',
    extension: '.d',
    category: 'systems',
    iconColor: '#BA595E',
    pistonLanguage: 'd',
    pistonVersion: '2.102.2',
    judge0Id: 56,
    templateCode: `import std.stdio;
import std.string;

void main() {
    string input = readln();
    if (input !is null && input.strip().length > 0) {
        writeln("Hello, ", input.strip(), "!");
    } else {
        writeln("Hello, Competitive Programmer from Nucleus!");
    }
}
`
  },
  {
    id: 'ocaml',
    name: 'OCaml',
    version: 'OCaml 5.1.1',
    monacoLanguage: 'ocaml',
    defaultFileName: 'main.ml',
    extension: '.ml',
    category: 'functional',
    iconColor: '#EE6A56',
    pistonLanguage: 'ocaml',
    pistonVersion: '4.12.0',
    judge0Id: 65,
    templateCode: `let () =
  try
    let input = String.trim (read_line ()) in
    if String.length input > 0 then
      Printf.printf "Hello, %s!\\n" input
    else
      Printf.printf "Hello, Competitive Programmer from Nucleus!\\n"
  with End_of_file ->
    Printf.printf "Hello, Competitive Programmer from Nucleus!\\n"
`
  },
  {
    id: 'fsharp',
    name: 'F#',
    version: 'F# 8.0 (.NET 8)',
    monacoLanguage: 'fsharp',
    defaultFileName: 'Program.fs',
    extension: '.fs',
    category: 'functional',
    iconColor: '#B845FC',
    pistonLanguage: 'fsharp',
    pistonVersion: '5.0.0',
    judge0Id: 87,
    templateCode: `open System

[<EntryPoint>]
let main argv =
    let input = Console.ReadLine()
    if not (String.IsNullOrWhiteSpace(input)) then
        printfn "Hello, %s!" (input.Trim())
    else
        printfn "Hello, Competitive Programmer from Nucleus!"
    0
`
  },
  {
    id: 'crystal',
    name: 'Crystal',
    version: 'Crystal 1.12.1',
    monacoLanguage: 'crystal',
    defaultFileName: 'main.cr',
    extension: '.cr',
    category: 'systems',
    iconColor: '#000100',
    pistonLanguage: 'crystal',
    pistonVersion: '1.7.3',
    judge0Id: 92,
    templateCode: `input = gets
if input && !input.strip.empty?
  puts "Hello, #{input.strip}!"
else
  puts "Hello, Competitive Programmer from Nucleus!"
end
`
  },
  {
    id: 'fortran',
    name: 'Fortran',
    version: 'GFortran 14.1 (F2018)',
    monacoLanguage: 'fortran',
    defaultFileName: 'main.f90',
    extension: '.f90',
    category: 'systems',
    iconColor: '#734F96',
    pistonLanguage: 'fortran',
    pistonVersion: '10.2.0',
    judge0Id: 59,
    templateCode: `PROGRAM NucleusCP
    IMPLICIT NONE
    CHARACTER(LEN=100) :: name
    INTEGER :: io_stat

    READ(*, '(A)', IOSTAT=io_stat) name
    IF (io_stat == 0 .AND. LEN_TRIM(name) > 0) THEN
        WRITE(*, '(A, A, A)') 'Hello, ', TRIM(name), '!'
    ELSE
        WRITE(*, '(A)') 'Hello, Competitive Programmer from Nucleus!'
    END IF
END PROGRAM NucleusCP
`
  },
  {
    id: 'pascal',
    name: 'Pascal',
    version: 'Free Pascal 3.2.2',
    monacoLanguage: 'pascal',
    defaultFileName: 'main.pas',
    extension: '.pas',
    category: 'legacy',
    iconColor: '#E3F171',
    pistonLanguage: 'pascal',
    pistonVersion: '3.2.2',
    judge0Id: 67,
    templateCode: `program NucleusCP;
uses sysutils;
var
  input: string;
begin
  if not SeekEOF then
  begin
    ReadLn(input);
    input := Trim(input);
    if Length(input) > 0 then
      WriteLn('Hello, ', input, '!')
    else
      WriteLn('Hello, Competitive Programmer from Nucleus!');
  end
  else
    WriteLn('Hello, Competitive Programmer from Nucleus!');
end.
`
  },
  {
    id: 'groovy',
    name: 'Groovy',
    version: 'Groovy 4.0.21',
    monacoLanguage: 'groovy',
    defaultFileName: 'main.groovy',
    extension: '.groovy',
    category: 'jvm',
    iconColor: '#4298B8',
    pistonLanguage: 'groovy',
    pistonVersion: '3.0.7',
    judge0Id: 84,
    templateCode: `def reader = new BufferedReader(new InputStreamReader(System.in))
def line = reader.readLine()
if (line && line.trim()) {
    println "Hello, \${line.trim()}!"
} else {
    println "Hello, Competitive Programmer from Nucleus!"
}
`
  },
  {
    id: 'bash',
    name: 'Bash Shell',
    version: 'Bash 5.2.21',
    monacoLanguage: 'shell',
    defaultFileName: 'script.sh',
    extension: '.sh',
    category: 'scripting',
    iconColor: '#89E051',
    pistonLanguage: 'bash',
    pistonVersion: '5.2.0',
    judge0Id: 46,
    templateCode: `#!/usr/bin/env bash

read -r input
if [ -n "$input" ]; then
    echo "Hello, $input!"
else
    echo "Hello, Competitive Programmer from Nucleus!"
fi
`
  },
  {
    id: 'nasm',
    name: 'Assembly (NASM x86_64)',
    version: 'NASM 2.16.01',
    monacoLanguage: 'nasm',
    defaultFileName: 'main.asm',
    extension: '.asm',
    category: 'systems',
    iconColor: '#6E4C13',
    pistonLanguage: 'nasm64',
    pistonVersion: '2.15.5',
    judge0Id: 45,
    templateCode: `section .data
    msg db "Hello, Competitive Programmer from Nucleus!", 10
    len equ $ - msg

section .text
    global _start

_start:
    ; write syscall (sys_write = 1, fd = 1 for stdout)
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    ; exit syscall (sys_exit = 60, code = 0)
    mov rax, 60
    xor rdi, rdi
    syscall
`
  },
  {
    id: 'cobol',
    name: 'COBOL',
    version: 'GnuCOBOL 3.2.0',
    monacoLanguage: 'cobol',
    defaultFileName: 'main.cbl',
    extension: '.cbl',
    category: 'legacy',
    iconColor: '#005A9C',
    pistonLanguage: 'cobol',
    pistonVersion: '3.1.2',
    judge0Id: 77,
    templateCode: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. NUCLEUS-CP.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 USER-NAME PIC X(50) VALUE SPACES.
       PROCEDURE DIVISION.
           ACCEPT USER-NAME.
           IF USER-NAME = SPACES
               DISPLAY "Hello, Competitive Programmer from Nucleus!"
           ELSE
               DISPLAY "Hello, " FUNCTION TRIM(USER-NAME) "!"
           END-IF.
           STOP RUN.
`
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Languages',
  popular: 'Popular & Top CP',
  systems: 'Systems (C++, Rust, C, Zig...)',
  jvm: 'JVM (Java, Kotlin, Scala...)',
  web: 'Web & JS / TS',
  functional: 'Functional (Haskell, Elixir...)',
  scripting: 'Scripting & Dynamic',
  legacy: 'Specialized & Legacy'
};