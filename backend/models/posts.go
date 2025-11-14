package models

import "time"

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Image     string    `json:"image"`
	Type      string    `json:"type"`
	CreatedAt time.Time `json:"created_at"`
}
