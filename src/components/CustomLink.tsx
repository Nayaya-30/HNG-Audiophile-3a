'use client'

import React from 'react'
import NextLink, { LinkProps } from 'next/link'

type CustomLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode
    legacy?: boolean
  }

/**
 * A universal Link wrapper that supports both legacy and new Link behavior.
 * Automatically prevents the "Invalid <Link> with <a> child" error.
 */
export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  legacy,
  children,
  ...props
}) => {
  // If the child is already an <a>, enforce legacy mode
  const isAnchorChild =
    React.isValidElement(children) &&
    (children.type === 'a' ||
      (typeof children.type === 'string' &&
        children.type.toLowerCase() === 'a'))

  // Force legacyBehavior if needed
  if (legacy || isAnchorChild) {
    return (
      <NextLink href={href} legacyBehavior passHref>
        {React.cloneElement(children as React.ReactElement, props)}
      </NextLink>
    )
  }

  // Modern behavior
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  )
}
