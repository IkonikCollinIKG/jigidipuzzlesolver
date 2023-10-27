// ==UserScript==
// @name         Jigidi Puzzle Solver
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatischer Puzzle Solver für Jigidi Puzzles
// @author       C377UM
// @icon         https://ibb.co/JqBhTqS
// @match        https://www.jigidi.com/solve/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    class JigidiPuzzleSolver {
      constructor() {
        this.pieces = [];
        this.pieceSize = 100; // Ändern Sie dies entsprechend der tatsächlichen Größe der Puzzleteile
        this.isSolving = false;
      }
  
      autoArrangePieces() {
        this.pieces = document.querySelectorAll(".puzzle-piece");
        if (this.pieces.length === 0 || this.isSolving) {
          return;
        }
  
        const solvedPieceCount = this.pieces.length;
  
        this.isSolving = true;
  
        const solveInterval = setInterval(() => {
          let isChanged = false;
  
          this.pieces.forEach((piece, index) => {
            const rect1 = piece.getBoundingClientRect();
  
            for (let i = index + 1; i < this.pieces.length; i++) {
              const otherPiece = this.pieces[i];
              const rect2 = otherPiece.getBoundingClientRect();
  
              if (Math.abs(rect1.right - rect2.left) <= this.pieceSize) {
                // Wenn die rechte Kante von piece nahe an der linken Kante von otherPiece liegt, werden sie ausgerichtet.
                piece.style.left = `${rect2.left - rect1.width}px`;
                isChanged = true;
                break;
              }
              
              if (Math.abs(rect1.left - rect2.right) <= this.pieceSize) {
                // Wenn die linke Kante von piece nahe an der rechten Kante von otherPiece liegt, werden sie ausgerichtet.
                piece.style.left = `${rect2.right}px`;
                isChanged = true;
                break;
              }
              
              if (Math.abs(rect1.bottom - rect2.top) <= this.pieceSize) {
                // Wenn die untere Kante von piece nahe an der oberen Kante von otherPiece liegt, werden sie ausgerichtet.
                piece.style.top = `${rect2.top - rect1.height}px`;
                isChanged = true;
                break;
              }
              
              if (Math.abs(rect1.top - rect2.bottom) <= this.pieceSize) {
                // Wenn die obere Kante von piece nahe an der unteren Kante von otherPiece liegt, werden sie ausgerichtet.
                piece.style.top = `${rect2.bottom}px`;
                isChanged = true;
                break;
              }
            }
          });
  
          if (!isChanged || this.pieces.length === solvedPieceCount) {
            clearInterval(solveInterval);
            this.isSolving = false;
          }
        }, 1000); // Verzögerung zwischen Aktionen beträgt 1 Sekunde
      }
    }
  
    const puzzleSolver = new JigidiPuzzleSolver();
  
    // Automatischer Start des Solvers beim Laden der Seite
    window.addEventListener("DOMContentLoaded", () => {
      puzzleSolver.autoArrangePieces();
    });
  })();
  
  


  